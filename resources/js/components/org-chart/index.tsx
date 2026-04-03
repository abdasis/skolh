import { useEffect, useMemo, useRef } from 'react';
import * as d3 from 'd3';
import { type OrganizationNodeResource } from '@/types';
import { PersonCard } from './person-card';
import { buildTree, type TreeNode } from './types';

interface Props {
    nodes: OrganizationNodeResource[];
}

type FromSide = 'top' | 'bottom' | 'left' | 'right';
type ToSide = 'left' | 'center' | 'right';

interface LayoutNode extends OrganizationNodeResource {
    x: number;
    y: number;
}

// Ukuran node di admin (design.tsx) — dipakai sebagai basis scaling
const ADMIN_NODE_W = 180;
const ADMIN_NODE_H = 60;
const ADMIN_V_GAP  = 100;
const ADMIN_H_GAP  = 40;

// Ukuran aktual PersonCard di halaman public
// non-root: avatar h-12 (48px) + pill py-2 = ~56px tinggi, ~220px lebar
// root:     avatar h-16 (64px) + pill py-3 = ~76px tinggi, ~240px lebar
// Gunakan nilai yang cukup untuk semua kasus
const CARD_W = 240;
const CARD_H = 80;

// Faktor scale dari koordinat admin ke koordinat public
const SCALE_X = (CARD_W + 40) / (ADMIN_NODE_W + ADMIN_H_GAP);
const SCALE_Y = (CARD_H + 100) / (ADMIN_NODE_H + ADMIN_V_GAP);

// ── Layout ────────────────────────────────────────────────────────────────────

const autoLayout = (nodes: OrganizationNodeResource[]): LayoutNode[] => {
    const nodeMap = new Map<number, LayoutNode>();
    const childrenMap = new Map<number | null, number[]>();

    for (const node of nodes) {
        nodeMap.set(node.id, { ...node, x: 0, y: 0 });
        if (!childrenMap.has(node.parent_id)) childrenMap.set(node.parent_id, []);
        childrenMap.get(node.parent_id)!.push(node.id);
    }

    const roots = childrenMap.get(null) ?? [];

    const childrenByDir = (parentId: number) => {
        const all = childrenMap.get(parentId) ?? [];
        const vertical: number[] = [], right: number[] = [], left: number[] = [];
        for (const cid of all) {
            const side = nodeMap.get(cid)!.branch_side ?? 'center';
            if (side === 'left') right.push(cid);
            else if (side === 'right') left.push(cid);
            else vertical.push(cid);
        }
        return { vertical, right, left };
    };

    const V_GAP = 60;
    const H_GAP = 60;

    const getSubtreeSize = (id: number): { w: number; h: number } => {
        const { vertical, right, left } = childrenByDir(id);
        const vertW = vertical.length === 0
            ? CARD_W
            : vertical.reduce((s, cid) => s + getSubtreeSize(cid).w, 0) + H_GAP * (vertical.length - 1);
        const rightH = right.length === 0 ? 0 : right.reduce((s, cid) => s + getSubtreeSize(cid).h, 0) + V_GAP * (right.length - 1);
        const leftH  = left.length  === 0 ? 0 : left.reduce((s, cid) => s + getSubtreeSize(cid).h, 0)  + V_GAP * (left.length - 1);
        const w = Math.max(CARD_W, vertW);
        const h = Math.max(CARD_H, rightH, leftH) + (vertical.length > 0 ? CARD_H + V_GAP + getSubtreeSize(vertical[0]).h : 0);
        return { w, h };
    };

    const layoutNode = (id: number, x: number, y: number) => {
        const n = nodeMap.get(id);
        if (!n) return;
        n.x = x;
        n.y = y;
        const { vertical, right, left } = childrenByDir(id);
        if (vertical.length > 0) {
            const totalW = vertical.reduce((s, cid) => s + getSubtreeSize(cid).w, 0) + H_GAP * (vertical.length - 1);
            let sx = x + CARD_W / 2 - totalW / 2;
            for (const cid of vertical) {
                const { w } = getSubtreeSize(cid);
                layoutNode(cid, sx + w / 2 - CARD_W / 2, y + CARD_H + V_GAP);
                sx += w + H_GAP;
            }
        }
        let ry = y;
        for (const cid of right) {
            layoutNode(cid, x + CARD_W + H_GAP, ry);
            ry += getSubtreeSize(cid).h + V_GAP;
        }
        let ly = y;
        for (const cid of left) {
            const { w } = getSubtreeSize(cid);
            layoutNode(cid, x - H_GAP - w, ly);
            ly += getSubtreeSize(cid).h + V_GAP;
        }
    };

    const totalRootW = roots.reduce((s, rid) => s + getSubtreeSize(rid).w, 0) + H_GAP * Math.max(0, roots.length - 1);
    let startX = 400 - totalRootW / 2;
    for (const rid of roots) {
        const { w } = getSubtreeSize(rid);
        layoutNode(rid, startX + w / 2 - CARD_W / 2, 60);
        startX += w + H_GAP;
    }

    const positioned = new Set<number>();
    const collect = (id: number) => {
        positioned.add(id);
        for (const cid of childrenMap.get(id) ?? []) collect(cid);
    };
    roots.forEach(collect);

    let orphanY = 60;
    for (const node of nodeMap.values()) {
        if (!positioned.has(node.id)) {
            node.x = 900;
            node.y = orphanY;
            orphanY += CARD_H + 20;
        }
    }

    return Array.from(nodeMap.values());
};

// Jika semua node punya koordinat dari DB (disimpan admin), scale koordinat
// agar PersonCard yang lebih besar tidak overlap antar layer.
const resolveLayout = (nodes: OrganizationNodeResource[]): LayoutNode[] => {
    const allHavePositions = nodes.length > 0 && nodes.every((n) => n.position_x !== null && n.position_y !== null);
    if (allHavePositions) {
        return nodes.map((n) => ({
            ...n,
            x: n.position_x! * SCALE_X,
            y: n.position_y! * SCALE_Y,
        }));
    }
    return autoLayout(nodes);
};

// ── Anchor & path konektor ────────────────────────────────────────────────────

const fromAnchor = (node: LayoutNode, side: FromSide) => {
    switch (side) {
        case 'top':    return { x: node.x + CARD_W / 2, y: node.y };
        case 'bottom': return { x: node.x + CARD_W / 2, y: node.y + CARD_H };
        case 'left':   return { x: node.x,              y: node.y + CARD_H / 2 };
        case 'right':  return { x: node.x + CARD_W,     y: node.y + CARD_H / 2 };
    }
};

const toAnchor = (node: LayoutNode, side: ToSide) => {
    switch (side) {
        case 'left':   return { x: node.x,              y: node.y + CARD_H / 2 };
        case 'center': return { x: node.x + CARD_W / 2, y: node.y };
        case 'right':  return { x: node.x + CARD_W,     y: node.y + CARD_H / 2 };
    }
};

const buildLinkPath = (source: LayoutNode, target: LayoutNode, fromSide: FromSide, toSide: ToSide): string => {
    const s = fromAnchor(source, fromSide);
    const t = toAnchor(target, toSide);
    const stub = 24;

    const exit = (side: FromSide, pt: { x: number; y: number }) => {
        switch (side) {
            case 'top':    return { x: pt.x, y: pt.y - stub };
            case 'bottom': return { x: pt.x, y: pt.y + stub };
            case 'left':   return { x: pt.x - stub, y: pt.y };
            case 'right':  return { x: pt.x + stub, y: pt.y };
        }
    };

    const entry = (side: ToSide, pt: { x: number; y: number }) => {
        switch (side) {
            case 'left':   return { x: pt.x + stub, y: pt.y };
            case 'center': return { x: pt.x, y: pt.y - stub };
            case 'right':  return { x: pt.x - stub, y: pt.y };
        }
    };

    const e1 = exit(fromSide, s);
    const e2 = entry(toSide, t);
    const fromHoriz = fromSide === 'left' || fromSide === 'right';
    const toHoriz   = toSide   === 'left' || toSide   === 'right';

    let mid1: { x: number; y: number };
    let mid2: { x: number; y: number };

    if (fromHoriz && toHoriz) {
        const midX = (e1.x + e2.x) / 2;
        mid1 = { x: midX, y: e1.y };
        mid2 = { x: midX, y: e2.y };
    } else if (!fromHoriz && !toHoriz) {
        const midY = (e1.y + e2.y) / 2;
        mid1 = { x: e1.x, y: midY };
        mid2 = { x: e2.x, y: midY };
    } else if (fromHoriz) {
        mid1 = { x: e2.x, y: e1.y };
        mid2 = mid1;
    } else {
        mid1 = { x: e1.x, y: e2.y };
        mid2 = mid1;
    }

    const pts = [s, e1, mid1, mid2, e2, t].filter(
        (p, i, arr) => i === 0 || p.x !== arr[i - 1].x || p.y !== arr[i - 1].y,
    );

    return 'M ' + pts.map((p) => `${p.x} ${p.y}`).join(' L ');
};

// ── Komponen ──────────────────────────────────────────────────────────────────

const OrgChart = ({ nodes }: Props) => {
    const tree = useMemo(() => buildTree(nodes), [nodes]);
    const svgRef = useRef<SVGSVGElement>(null);

    const layoutNodes = useMemo(() => resolveLayout(nodes), [nodes]);

    const links = useMemo(() => {
        const nodeMap = new Map(layoutNodes.map((n) => [n.id, n]));
        return layoutNodes
            .filter((n) => n.parent_id !== null)
            .map((n) => ({
                source: nodeMap.get(n.parent_id!),
                target: n,
                fromSide: (n.connector_from ?? 'bottom') as FromSide,
                toSide:   (n.branch_side   ?? 'center') as ToSide,
            }))
            .filter((l): l is { source: LayoutNode; target: LayoutNode; fromSide: FromSide; toSide: ToSide } => l.source !== undefined);
    }, [layoutNodes]);

    const treeNodeMap = useMemo(() => {
        const map = new Map<number, TreeNode>();
        const walk = (node: TreeNode) => {
            if (node.data.id !== -1) map.set(node.data.id, node);
            node.children.forEach(walk);
        };
        if (tree) walk(tree);
        return map;
    }, [tree]);

    useEffect(() => {
        if (!svgRef.current) return;
        const svg = d3.select(svgRef.current);
        const g = svg.select<SVGGElement>('g.canvas');
        const zoom = d3.zoom<SVGSVGElement, unknown>()
            .scaleExtent([0.2, 3])
            .on('zoom', (event) => { g.attr('transform', event.transform); });
        svg.call(zoom);
        const bounds = svgRef.current.getBoundingClientRect();
        svg.call(zoom.transform, d3.zoomIdentity.translate(bounds.width / 2 - 400, 20).scale(0.9));
    }, []);

    if (!tree) {
        return (
            <div className="flex h-64 items-center justify-center rounded-xl border border-dashed text-sm text-muted-foreground">
                Belum ada data struktur organisasi.
            </div>
        );
    }

    return (
        <div className="relative overflow-hidden rounded-xl border bg-muted/30" style={{ height: '70vh' }}>
            <svg ref={svgRef} className="h-full w-full" style={{ cursor: 'grab' }}>
                <g className="canvas">
                    {/* Garis konektor */}
                    {links.map((link) => (
                        <path
                            key={`link-${link.source.id}-${link.target.id}`}
                            d={buildLinkPath(link.source, link.target, link.fromSide, link.toSide)}
                            fill="none"
                            stroke="rgb(5 150 105 / 0.5)"
                            strokeWidth={2}
                        />
                    ))}

                    {/* Dot di ujung konektor */}
                    {links.flatMap((link) => [
                        { id: `dot-s-${link.source.id}-${link.target.id}`, ...fromAnchor(link.source, link.fromSide) },
                        { id: `dot-t-${link.source.id}-${link.target.id}`, ...toAnchor(link.target, link.toSide) },
                    ]).map((dot) => (
                        <circle key={dot.id} cx={dot.x} cy={dot.y} r={5} fill="rgb(5 150 105)" stroke="white" strokeWidth={2} />
                    ))}

                    {/* PersonCard via foreignObject */}
                    {layoutNodes.map((node) => {
                        const treeNode = treeNodeMap.get(node.id);
                        if (!treeNode) return null;
                        return (
                            <foreignObject
                                key={node.id}
                                x={node.x}
                                y={node.y}
                                width={400}
                                height={120}
                                style={{ overflow: 'visible' }}
                            >
                                <div style={{ display: 'inline-block' }}>
                                    <PersonCard node={treeNode} isRoot={node.parent_id === null} />
                                </div>
                            </foreignObject>
                        );
                    })}
                </g>
            </svg>

            <div className="absolute bottom-4 left-4 rounded-lg border bg-background/90 px-3 py-2 text-xs text-muted-foreground shadow-sm backdrop-blur">
                Scroll untuk zoom &middot; Drag untuk geser
            </div>
        </div>
    );
};

export { OrgChart };
