import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Head, router, setLayoutProps } from '@inertiajs/react';
import * as d3 from 'd3';
import { Button } from '@/components/ui/button';
import * as OrganizationNodeController from '@/actions/App/Http/Controllers/Admin/OrganizationNodeController';
import { type OrganizationNodeResource } from '@/types';

type FromSide = 'top' | 'bottom' | 'left' | 'right';
type ToSide = 'left' | 'center' | 'right';

interface ConnectingState {
    fromId: number;
    fromSide: FromSide;
}

interface PendingTarget {
    fromId: number;
    fromSide: FromSide;
    toId: number;
}

interface EditingLink {
    targetId: number;
    screenX: number;
    screenY: number;
}

type BranchDirection = 'left' | 'right' | 'top' | 'bottom';


interface DesignNode extends OrganizationNodeResource {
    x: number;
    y: number;
}

interface Props {
    nodes: OrganizationNodeResource[];
}

const NODE_WIDTH = 180;
const NODE_HEIGHT = 60;
const VERTICAL_GAP = 100;
const HORIZONTAL_GAP = 40;

const autoLayout = (nodes: OrganizationNodeResource[]): DesignNode[] => {
    const nodeMap = new Map<number, DesignNode>();
    const childrenMap = new Map<number | null, number[]>();

    for (const node of nodes) {
        nodeMap.set(node.id, { ...node, x: 0, y: 0 });
        const parentKey = node.parent_id;
        if (!childrenMap.has(parentKey)) {
            childrenMap.set(parentKey, []);
        }
        childrenMap.get(parentKey)!.push(node.id);
    }

    const roots = childrenMap.get(null) ?? [];

    // Pisahkan anak berdasarkan arah percabangan.
    // branch_side pada anak = sisi anak tempat koneksi masuk.
    // 'left'  → koneksi masuk dari kiri anak  → anak berada di KANAN parent
    // 'right' → koneksi masuk dari kanan anak → anak berada di KIRI parent
    // 'center'→ koneksi masuk dari atas anak  → anak berada di BAWAH parent
    const childrenByDir = (parentId: number): { vertical: number[]; right: number[]; left: number[] } => {
        const all = childrenMap.get(parentId) ?? [];
        const vertical: number[] = [];
        const right: number[] = [];
        const left: number[] = [];
        for (const cid of all) {
            const child = nodeMap.get(cid)!;
            const toSide = child.branch_side ?? 'center';
            if (toSide === 'left') right.push(cid);       // masuk dari kiri → anak di kanan parent
            else if (toSide === 'right') left.push(cid);  // masuk dari kanan → anak di kiri parent
            else vertical.push(cid);                       // masuk dari atas (center) → anak di bawah
        }
        return { vertical, right, left };
    };

    const getSubtreeSize = (id: number): { w: number; h: number } => {
        const { vertical, right, left } = childrenByDir(id);

        // Vertical children contribute to width below
        const vertW = vertical.length === 0
            ? NODE_WIDTH
            : vertical.reduce((sum, cid) => sum + getSubtreeSize(cid).w, 0) + HORIZONTAL_GAP * (vertical.length - 1);

        // Horizontal children (right/left) contribute to height
        const rightH = right.length === 0 ? 0 : right.reduce((sum, cid) => sum + getSubtreeSize(cid).h, 0) + VERTICAL_GAP * (right.length - 1);
        const leftH  = left.length === 0  ? 0 : left.reduce((sum, cid) => sum + getSubtreeSize(cid).h, 0) + VERTICAL_GAP * (left.length - 1);

        const w = Math.max(NODE_WIDTH, vertW);
        const h = Math.max(NODE_HEIGHT, rightH, leftH) + (vertical.length > 0 ? NODE_HEIGHT + VERTICAL_GAP + getSubtreeSize(vertical[0]).h : 0);
        return { w, h };
    };

    const layoutNode = (id: number, x: number, y: number) => {
        const n = nodeMap.get(id);
        if (!n) return;
        n.x = x;
        n.y = y;

        const { vertical, right, left } = childrenByDir(id);

        // Vertical children — below, centered
        if (vertical.length > 0) {
            const totalW = vertical.reduce((sum, cid) => sum + getSubtreeSize(cid).w, 0) + HORIZONTAL_GAP * (vertical.length - 1);
            let sx = x + NODE_WIDTH / 2 - totalW / 2;
            for (const cid of vertical) {
                const { w } = getSubtreeSize(cid);
                layoutNode(cid, sx + w / 2 - NODE_WIDTH / 2, y + NODE_HEIGHT + VERTICAL_GAP);
                sx += w + HORIZONTAL_GAP;
            }
        }

        // Right children — stacked to the right
        let ry = y;
        for (const cid of right) {
            layoutNode(cid, x + NODE_WIDTH + HORIZONTAL_GAP, ry);
            ry += getSubtreeSize(cid).h + VERTICAL_GAP;
        }

        // Left children — stacked to the left
        let ly = y;
        for (const cid of left) {
            const { w } = getSubtreeSize(cid);
            layoutNode(cid, x - HORIZONTAL_GAP - w, ly);
            ly += getSubtreeSize(cid).h + VERTICAL_GAP;
        }
    };

    // Layout roots
    const totalRootWidth = roots.reduce((sum, rid) => sum + getSubtreeSize(rid).w, 0) + HORIZONTAL_GAP * Math.max(0, roots.length - 1);
    let startX = 400 - totalRootWidth / 2;
    for (const rid of roots) {
        const { w } = getSubtreeSize(rid);
        layoutNode(rid, startX + w / 2 - NODE_WIDTH / 2, 60);
        startX += w + HORIZONTAL_GAP;
    }

    // Orphans
    const positioned = new Set<number>();
    const collectPositioned = (id: number) => {
        positioned.add(id);
        for (const cid of childrenMap.get(id) ?? []) collectPositioned(cid);
    };
    roots.forEach(collectPositioned);

    let orphanY = 60;
    for (const node of nodeMap.values()) {
        if (!positioned.has(node.id)) {
            node.x = 800;
            node.y = orphanY;
            orphanY += NODE_HEIGHT + 20;
        }
    }

    return Array.from(nodeMap.values());
};

// Compute anchor point on a node for outgoing (fromSide)
const fromSideAnchor = (node: DesignNode, side: FromSide): { x: number; y: number } => {
    switch (side) {
        case 'top':    return { x: node.x + NODE_WIDTH / 2, y: node.y };
        case 'bottom': return { x: node.x + NODE_WIDTH / 2, y: node.y + NODE_HEIGHT };
        case 'left':   return { x: node.x, y: node.y + NODE_HEIGHT / 2 };
        case 'right':  return { x: node.x + NODE_WIDTH, y: node.y + NODE_HEIGHT / 2 };
    }
};

// Compute anchor point on a node for incoming (toSide / branch_side)
const toSideAnchor = (node: DesignNode, side: ToSide): { x: number; y: number } => {
    switch (side) {
        case 'left':   return { x: node.x, y: node.y + NODE_HEIGHT / 2 };
        case 'center': return { x: node.x + NODE_WIDTH / 2, y: node.y };
        case 'right':  return { x: node.x + NODE_WIDTH, y: node.y + NODE_HEIGHT / 2 };
    }
};

const FROM_SIDE_LABELS: Record<FromSide, string> = { top: 'Atas', bottom: 'Bawah', left: 'Kiri', right: 'Kanan' };
const TO_SIDE_LABELS: Record<ToSide, string> = { left: 'Kiri', center: 'Tengah', right: 'Kanan' };

// Positions of outgoing connector buttons relative to node origin
const FROM_SIDE_OFFSETS: Record<FromSide, { x: number; y: number }> = {
    top:    { x: NODE_WIDTH / 2 - 8, y: -28 },
    bottom: { x: NODE_WIDTH / 2 - 8, y: NODE_HEIGHT + 12 },
    left:   { x: -28, y: NODE_HEIGHT / 2 - 8 },
    right:  { x: NODE_WIDTH + 12, y: NODE_HEIGHT / 2 - 8 },
};

// Positions of incoming side-picker buttons relative to node origin
const TO_SIDE_OFFSETS: Record<ToSide, { x: number; y: number }> = {
    left:   { x: -28, y: NODE_HEIGHT / 2 - 8 },
    center: { x: NODE_WIDTH / 2 - 8, y: -28 },
    right:  { x: NODE_WIDTH + 12, y: NODE_HEIGHT / 2 - 8 },
};

const resolveInitialLayout = (nodes: OrganizationNodeResource[]): DesignNode[] => {
    const allHavePositions = nodes.length > 0 && nodes.every((n) => n.position_x !== null && n.position_y !== null);
    if (allHavePositions) {
        return nodes.map((n) => ({ ...n, x: n.position_x!, y: n.position_y! }));
    }
    return autoLayout(nodes);
};

const AdminOrganizationNodesDesign = ({ nodes: initialNodes }: Props) => {
    setLayoutProps({
        breadcrumbs: [
            { title: 'Dashboard', href: '/dashboard' },
            { title: 'Struktur Organisasi', href: OrganizationNodeController.index.url() },
            { title: 'Desain Struktur', href: OrganizationNodeController.design.url() },
        ],
    });

    const svgRef = useRef<SVGSVGElement>(null);
    const gRef = useRef<SVGGElement | null>(null);
    const [designNodes, setDesignNodes] = useState<DesignNode[]>(() => resolveInitialLayout(initialNodes));
    const [connecting, setConnecting] = useState<ConnectingState | null>(null);
    const [pendingTarget, setPendingTarget] = useState<PendingTarget | null>(null);
    const [hoveredNode, setHoveredNode] = useState<number | null>(null);
    const [hoveredLink, setHoveredLink] = useState<number | null>(null);
    const hoveredLinkLeaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [editingLink, setEditingLink] = useState<EditingLink | null>(null);
    const [branchFromLink, setBranchFromLink] = useState<{
        sourceId: number;
        connectorFrom: FromSide;
        branchSide: ToSide;
    } | null>(null);
    const [connectingToLink, setConnectingToLink] = useState<{
        fromId: number;
        fromSide: FromSide;
    } | null>(null);
    const [saving, setSaving] = useState(false);
    const [dirty, setDirty] = useState(false);

    const nodesRef = useRef(designNodes);
    nodesRef.current = designNodes;

    // Build link data from current nodes
    const links = useMemo(() => {
        const nodeMap = new Map(designNodes.map((n) => [n.id, n]));
        return designNodes
            .filter((n) => n.parent_id !== null)
            .map((n) => ({
                source: nodeMap.get(n.parent_id!),
                target: n,
                fromSide: (n.connector_from ?? 'bottom') as FromSide,
                toSide: (n.branch_side ?? 'center') as ToSide,
            }))
            .filter((l): l is { source: DesignNode; target: DesignNode; fromSide: FromSide; toSide: ToSide } => l.source !== undefined);
    }, [designNodes]);

    // Initialize D3 zoom
    useEffect(() => {
        if (!svgRef.current) return;

        const svg = d3.select(svgRef.current);
        const g = svg.select<SVGGElement>('g.canvas');
        gRef.current = g.node();

        const zoom = d3.zoom<SVGSVGElement, unknown>()
            .scaleExtent([0.2, 3])
            .on('zoom', (event) => {
                g.attr('transform', event.transform);
            });

        svg.call(zoom);

        // Initial fit
        const bounds = svgRef.current.getBoundingClientRect();
        svg.call(zoom.transform, d3.zoomIdentity.translate(bounds.width / 2 - 400, 20).scale(0.9));
    }, []);

    const handleNodeMouseDown = useCallback((e: React.MouseEvent, nodeId: number) => {
        e.stopPropagation();

        // Connect-to-link mode: clicking any node dismisses the mode
        if (connectingToLink !== null) {
            setConnectingToLink(null);
            return;
        }

        // Branch-from-link mode: clicking a node directly assigns it as child of source
        // with pre-determined connector_from and branch_side (no side picker needed).
        if (branchFromLink !== null && branchFromLink.sourceId !== nodeId) {
            setDesignNodes((prev) =>
                prev.map((n) =>
                    n.id === nodeId
                        ? { ...n, parent_id: branchFromLink.sourceId, connector_from: branchFromLink.connectorFrom, branch_side: branchFromLink.branchSide }
                        : n,
                ),
            );
            setBranchFromLink(null);
            setDirty(true);
            return;
        }
        if (branchFromLink !== null) {
            setBranchFromLink(null);
            return;
        }

        // If side-picker is open for this node, clicking card body dismisses it
        if (pendingTarget !== null) {
            if (pendingTarget.toId !== nodeId) {
                // Clicked a different node while picker open — treat as new target
                setPendingTarget({ fromId: pendingTarget.fromId, fromSide: pendingTarget.fromSide, toId: nodeId });
            }
            return;
        }

        // If connecting mode, show side picker on target node
        if (connecting !== null && connecting.fromId !== nodeId) {
            setPendingTarget({ fromId: connecting.fromId, fromSide: connecting.fromSide, toId: nodeId });
            setConnecting(null);
            return;
        }

        // Start drag
        const node = nodesRef.current.find((n) => n.id === nodeId);
        if (!node || !gRef.current) return;

        const gTransform = gRef.current.getCTM();
        const scale = gTransform?.a ?? 1;

        const startX = e.clientX;
        const startY = e.clientY;
        const origX = node.x;
        const origY = node.y;
        let moved = false;

        const onMove = (ev: MouseEvent) => {
            const dx = (ev.clientX - startX) / scale;
            const dy = (ev.clientY - startY) / scale;
            if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
                moved = true;
            }
            setDesignNodes((prev) =>
                prev.map((n) => (n.id === nodeId ? { ...n, x: origX + dx, y: origY + dy } : n)),
            );
        };

        const onUp = () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseup', onUp);
            if (moved) {
                setDirty(true);
            }
        };

        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onUp);
    }, [connecting, pendingTarget, branchFromLink, connectingToLink]);

    const handleConnectStart = useCallback((e: React.MouseEvent, nodeId: number, side: FromSide) => {
        e.stopPropagation();
        setPendingTarget(null);
        setConnecting({ fromId: nodeId, fromSide: side });
    }, []);

    const handlePickTargetSide = useCallback((e: React.MouseEvent, toSide: ToSide) => {
        e.stopPropagation();
        if (!pendingTarget) return;
        const { fromId, fromSide, toId } = pendingTarget;
        setDesignNodes((prev) =>
            prev.map((n) =>
                n.id === toId
                    ? { ...n, parent_id: fromId, connector_from: fromSide, branch_side: toSide }
                    : n,
            ),
        );
        setPendingTarget(null);
        setDirty(true);
    }, [pendingTarget]);

    const handleAddFromLink = useCallback((e: React.MouseEvent, sourceId: number, linkFromSide: FromSide, direction: BranchDirection) => {
        // Branching from a link: the new node becomes a child of the SOURCE node.
        // connector_from = same as existing link (so lines merge at junction).
        // branch_side = determined by direction (left→right, right→left, top/bottom→center).
        // Then user clicks a target node to complete the connection — no side picker needed.
        e.stopPropagation();
        const branchSideMap: Record<BranchDirection, ToSide> = {
            left: 'right',
            right: 'left',
            top: 'center',
            bottom: 'center',
        };
        setBranchFromLink({ sourceId, connectorFrom: linkFromSide, branchSide: branchSideMap[direction] });
        setHoveredLink(null);
    }, []);

    const fromSideToBranchSide = (side: FromSide): ToSide => {
        if (side === 'left') return 'left';
        if (side === 'right') return 'right';
        return 'center';
    };

    const handleConnectToLinkStart = useCallback((e: React.MouseEvent, nodeId: number, side: FromSide) => {
        e.stopPropagation();
        setPendingTarget(null);
        setConnecting(null);
        setBranchFromLink(null);
        setConnectingToLink({ fromId: nodeId, fromSide: side });
    }, []);

    const handleConnectNodeToLink = useCallback((e: React.MouseEvent, link: { source: DesignNode; target: DesignNode; fromSide: FromSide; toSide: ToSide }) => {
        e.stopPropagation();
        if (!connectingToLink) return;
        const { fromId, fromSide } = connectingToLink;
        setDesignNodes((prev) =>
            prev.map((n) =>
                n.id === fromId
                    ? { ...n, parent_id: link.source.id, connector_from: link.fromSide, branch_side: fromSideToBranchSide(fromSide) }
                    : n,
            ),
        );
        setConnectingToLink(null);
        setDirty(true);
    }, [connectingToLink]);

    const handleEditLink = useCallback((e: React.MouseEvent, targetId: number, svgMx: number, svgMy: number) => {
        e.stopPropagation();
        if (!svgRef.current) return;
        const ctm = svgRef.current.getScreenCTM();
        if (!ctm) return;
        const screenX = ctm.a * svgMx + ctm.c * svgMy + ctm.e;
        const screenY = ctm.b * svgMx + ctm.d * svgMy + ctm.f;
        setEditingLink({ targetId, screenX, screenY });
        setHoveredLink(null);
    }, []);

    const handleUpdateLinkSides = useCallback((targetId: number, fromSide: FromSide, branchSide: ToSide) => {
        setDesignNodes((prev) =>
            prev.map((n) =>
                n.id === targetId
                    ? { ...n, connector_from: fromSide, branch_side: branchSide }
                    : n,
            ),
        );
        setEditingLink(null);
        setDirty(true);
    }, []);

    const handleDisconnect = useCallback((e: React.MouseEvent, nodeId: number) => {
        e.stopPropagation();
        setDesignNodes((prev) =>
            prev.map((n) =>
                n.id === nodeId
                    ? { ...n, parent_id: null, connector_from: 'bottom' as const, branch_side: 'center' as const }
                    : n,
            ),
        );
        setDirty(true);
    }, []);

    const handleCancelConnect = useCallback(() => {
        setConnecting(null);
        setPendingTarget(null);
        setConnectingToLink(null);
    }, []);

    const handleSave = useCallback(() => {
        setSaving(true);
        const payload = designNodes.map((n, i) => ({
            id: n.id,
            parent_id: n.parent_id,
            sort_order: i,
            branch_side: n.branch_side,
            connector_from: n.connector_from,
            position_x: n.x,
            position_y: n.y,
        }));

        router.post(OrganizationNodeController.saveDesign.url(), { nodes: payload } as never, {
            preserveScroll: true,
            onFinish: () => {
                setSaving(false);
                setDirty(false);
            },
        });
    }, [designNodes]);

    const handleAutoLayout = useCallback(() => {
        setDesignNodes(autoLayout(designNodes));
        setDirty(true);
    }, [designNodes]);

    const linkPath = (
        source: DesignNode,
        target: DesignNode,
        fromSide: FromSide,
        toSide: ToSide,
    ): string => {
        const s = fromSideAnchor(source, fromSide);
        const t = toSideAnchor(target, toSide);

        // Stub length: how far the line travels straight out before turning
        const stub = 24;

        const exit = (side: FromSide, pt: { x: number; y: number }) => {
            switch (side) {
                case 'top':    return { x: pt.x, y: pt.y - stub };
                case 'bottom': return { x: pt.x, y: pt.y + stub };
                case 'left':   return { x: pt.x - stub, y: pt.y };
                case 'right':  return { x: pt.x + stub, y: pt.y };
            }
        };

        // Entry stub goes in the OPPOSITE direction (away from node, toward incoming line)
        const entry = (side: ToSide, pt: { x: number; y: number }) => {
            switch (side) {
                case 'left':   return { x: pt.x + stub, y: pt.y };  // connection arrives from the left, so stub goes right → toward source
                case 'center': return { x: pt.x, y: pt.y - stub };  // arrives from top
                case 'right':  return { x: pt.x - stub, y: pt.y };  // arrives from right, stub goes left
            }
        };

        const e1 = exit(fromSide, s);
        const e2 = entry(toSide, t);

        // Connect e1 → e2 with a single midpoint turn.
        // If both stubs are horizontal, meet at vertical midpoint; otherwise at horizontal midpoint.
        const fromHoriz = fromSide === 'left' || fromSide === 'right';
        const toHoriz = toSide === 'left' || toSide === 'right';

        let mid1: { x: number; y: number };
        let mid2: { x: number; y: number };

        if (fromHoriz && toHoriz) {
            // both horizontal — route via vertical midpoint
            const midX = (e1.x + e2.x) / 2;
            mid1 = { x: midX, y: e1.y };
            mid2 = { x: midX, y: e2.y };
        } else if (!fromHoriz && !toHoriz) {
            // both vertical — route via horizontal midpoint
            const midY = (e1.y + e2.y) / 2;
            mid1 = { x: e1.x, y: midY };
            mid2 = { x: e2.x, y: midY };
        } else if (fromHoriz && !toHoriz) {
            // horizontal out, vertical in — corner at (e2.x, e1.y)
            mid1 = { x: e2.x, y: e1.y };
            mid2 = mid1;
        } else {
            // vertical out, horizontal in — corner at (e1.x, e2.y)
            mid1 = { x: e1.x, y: e2.y };
            mid2 = mid1;
        }

        const pts = [s, e1, mid1, mid2, e2, t].filter(
            (p, i, arr) => i === 0 || p.x !== arr[i - 1].x || p.y !== arr[i - 1].y,
        );

        return 'M ' + pts.map((p) => `${p.x} ${p.y}`).join(' L ');
    };

    const editingLinkData = useMemo(() => {
        if (!editingLink) return null;
        return links.find((l) => l.target.id === editingLink.targetId) ?? null;
    }, [editingLink, links]);

    const isConnectingMode = connecting !== null;
    const isConnectingToLinkMode = connectingToLink !== null;

    return (
        <>
            <Head title="Desain Struktur Organisasi" />

            <div className="flex h-[calc(100vh-4rem)] flex-col">
                {/* Toolbar */}
                <div className="flex items-center justify-between border-b px-4 py-2">
                    <div className="flex items-center gap-3">
                        <h1 className="text-lg font-semibold">Desain Struktur</h1>
                        {isConnectingMode && (
                            <div className="flex items-center gap-2">
                                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300">
                                    Klik node tujuan untuk memilih sisi sambungan
                                </span>
                                <Button variant="outline" size="sm" onClick={handleCancelConnect}>
                                    Batal
                                </Button>
                            </div>
                        )}
                        {pendingTarget !== null && (
                            <div className="flex items-center gap-2">
                                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
                                    Pilih sisi masuk pada node tujuan
                                </span>
                                <Button variant="outline" size="sm" onClick={handleCancelConnect}>
                                    Batal
                                </Button>
                            </div>
                        )}
                        {branchFromLink !== null && (
                            <div className="flex items-center gap-2">
                                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700 dark:bg-amber-900/50 dark:text-amber-300">
                                    Klik node untuk disambungkan ke garis
                                </span>
                                <Button variant="outline" size="sm" onClick={() => setBranchFromLink(null)}>
                                    Batal
                                </Button>
                            </div>
                        )}
                        {connectingToLink !== null && (
                            <div className="flex items-center gap-2">
                                <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-medium text-violet-700 dark:bg-violet-900/50 dark:text-violet-300">
                                    Klik garis untuk menyambungkan node
                                </span>
                                <Button variant="outline" size="sm" onClick={handleCancelConnect}>
                                    Batal
                                </Button>
                            </div>
                        )}
                        {dirty && (
                            <span className="text-xs text-amber-600 dark:text-amber-400">
                                Perubahan belum disimpan
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={handleAutoLayout}>
                            Auto Layout
                        </Button>
                        <Button size="sm" onClick={handleSave} disabled={saving || !dirty}>
                            {saving ? 'Menyimpan...' : 'Simpan Struktur'}
                        </Button>
                    </div>
                </div>

                {/* Canvas */}
                <div className="relative flex-1 overflow-hidden bg-muted/30">
                    <svg
                        ref={svgRef}
                        className="h-full w-full"
                        style={{ cursor: (isConnectingMode || isConnectingToLinkMode) ? 'crosshair' : 'grab' }}
                        onClick={() => { if (editingLink) setEditingLink(null); if (connectingToLink) setConnectingToLink(null); }}
                    >
                        <defs>
                            <marker
                                id="dot"
                                markerWidth="6"
                                markerHeight="6"
                                refX="3"
                                refY="3"
                                orient="auto"
                            >
                                <circle cx={3} cy={3} r={3} className="fill-emerald-500" />
                            </marker>
                        </defs>
                        <g className="canvas">
                            {/* Links */}
                            {links.map((link) => {
                                const d = linkPath(link.source, link.target, link.fromSide, link.toSide);
                                const isHovered = hoveredLink === link.target.id;
                                const isEditing = editingLink?.targetId === link.target.id;
                                const isSelectableForLink = isConnectingToLinkMode;
                                const isHoveredForLink = isSelectableForLink && hoveredLink === link.target.id;
                                // Midpoint between source and target anchors for action buttons
                                const sa = fromSideAnchor(link.source, link.fromSide);
                                const ta = toSideAnchor(link.target, link.toSide);
                                const mx = (sa.x + ta.x) / 2;
                                const my = (sa.y + ta.y) / 2;

                                // Determine link orientation to know which branch directions are available.
                                // A link is "vertical" when fromSide is top/bottom and toSide is center (child below parent).
                                // A link is "horizontal" when fromSide is left/right and toSide is left/right (child beside parent).
                                // For vertical links: can branch left or right from the midpoint.
                                // For horizontal links: can branch up or down from the midpoint.
                                const fromHoriz = link.fromSide === 'left' || link.fromSide === 'right';
                                const toHoriz   = link.toSide   === 'left' || link.toSide   === 'right';
                                const isHorizontalLink = fromHoriz && toHoriz;
                                const branchDirs: BranchDirection[] = isHorizontalLink ? ['top', 'bottom'] : ['left', 'right'];

                                return (
                                    <g
                                        key={`link-${link.source.id}-${link.target.id}`}
                                        onMouseEnter={() => {
                                            if (hoveredLinkLeaveTimer.current) clearTimeout(hoveredLinkLeaveTimer.current);
                                            if (!editingLink) setHoveredLink(link.target.id);
                                        }}
                                        onMouseLeave={() => {
                                            hoveredLinkLeaveTimer.current = setTimeout(() => setHoveredLink(null), 120);
                                        }}
                                        onClick={(e) => { if (isConnectingToLinkMode) handleConnectNodeToLink(e, link); }}
                                        style={{ cursor: isConnectingToLinkMode ? 'pointer' : 'default' }}
                                    >
                                        {/* Invisible wide stroke for easier hover */}
                                        <path
                                            d={d}
                                            fill="none"
                                            stroke="transparent"
                                            strokeWidth={12}
                                            className="cursor-pointer"
                                        />
                                        {/* Visible line */}
                                        <path
                                            d={d}
                                            fill="none"
                                            stroke={
                                                isHoveredForLink    ? 'rgb(139 92 246)'
                                                : isSelectableForLink ? 'rgb(167 139 250)'
                                                : isHovered         ? 'rgb(239 68 68)'
                                                : isEditing         ? 'rgb(59 130 246)'
                                                : 'rgb(16 185 129)'
                                            }
                                            strokeWidth={isHoveredForLink || isSelectableForLink || isHovered || isEditing ? 2.5 : 2}
                                            markerStart="url(#dot)"
                                            markerEnd="url(#dot)"
                                            className="pointer-events-none transition-colors"
                                        />
                                        {/* Action buttons at midpoint — branch-add + edit + delete */}
                                        {isHovered && !isConnectingToLinkMode && (() => {
                                            // Bounding box that covers all buttons so mouse never leaves
                                            // while moving between the line and any button.
                                            // Vertical link: buttons span left-52..right+44 horizontally, -8..+8 vertically (single row)
                                            // Horizontal link: buttons span -30..+22 horizontally, -28..+20 vertically
                                            const hitX = isHorizontalLink ? mx - 30 : mx - 60;
                                            const hitY = isHorizontalLink ? my - 36 : my - 16;
                                            const hitW = isHorizontalLink ? 60 : 120;
                                            const hitH = isHorizontalLink ? 72 : 32;
                                            return (
                                                <g
                                                    onMouseEnter={() => { if (hoveredLinkLeaveTimer.current) clearTimeout(hoveredLinkLeaveTimer.current); }}
                                                    onMouseLeave={() => { hoveredLinkLeaveTimer.current = setTimeout(() => setHoveredLink(null), 120); }}
                                                >
                                                    {/* Invisible hit-area covering the full button cluster */}
                                                    <rect
                                                        x={hitX} y={hitY} width={hitW} height={hitH}
                                                        fill="transparent"
                                                        stroke="none"
                                                    />
                                                    {/* Edit button */}
                                                    <g
                                                        transform={`translate(${mx - 30}, ${my - 8})`}
                                                        className="cursor-pointer"
                                                        onClick={(e) => handleEditLink(e, link.target.id, mx, my)}
                                                    >
                                                        <circle cx={8} cy={8} r={10} className="fill-white stroke-blue-400 stroke-2" />
                                                        <text x={8} y={13} textAnchor="middle" className="fill-blue-500 text-[11px] font-bold select-none">✎</text>
                                                    </g>
                                                    {/* Delete button */}
                                                    <g
                                                        transform={`translate(${mx + 14}, ${my - 8})`}
                                                        className="cursor-pointer"
                                                        onClick={(e) => { e.stopPropagation(); handleDisconnect(e, link.target.id); }}
                                                    >
                                                        <circle cx={8} cy={8} r={10} className="fill-white stroke-red-400 stroke-2" />
                                                        <text x={8} y={13} textAnchor="middle" className="fill-red-500 text-[12px] font-bold select-none">×</text>
                                                    </g>
                                                    {/* Branch add buttons */}
                                                    {branchDirs.map((dir) => {
                                                        const offset = isHorizontalLink
                                                            ? { x: -8, y: dir === 'top' ? -28 : 12 }
                                                            : { x: dir === 'left' ? -52 : 36, y: -8 };
                                                        return (
                                                            <g
                                                                key={`branch-${dir}`}
                                                                transform={`translate(${mx + offset.x}, ${my + offset.y})`}
                                                                className="cursor-pointer"
                                                                onClick={(e) => handleAddFromLink(e, link.source.id, link.fromSide, dir)}
                                                            >
                                                                <circle cx={8} cy={8} r={9} className="fill-white stroke-amber-400 stroke-2" />
                                                                <text x={8} y={13} textAnchor="middle" className="fill-amber-500 text-[13px] font-bold select-none">+</text>
                                                                <title>Tambah node {dir === 'left' ? 'kiri' : dir === 'right' ? 'kanan' : dir === 'top' ? 'atas' : 'bawah'}</title>
                                                            </g>
                                                        );
                                                    })}
                                                </g>
                                            );
                                        })()}
                                    </g>
                                );
                            })}

                            {/* Nodes */}
                            {designNodes.map((node) => {
                                const isSource = connecting?.fromId === node.id;
                                const isTarget = isConnectingMode && !isSource;
                                const isPendingTarget = pendingTarget?.toId === node.id;
                                const isBranchTarget = branchFromLink !== null && branchFromLink.sourceId !== node.id;
                                const isConnectingToLinkSource = connectingToLink?.fromId === node.id;

                                return (
                                    <g
                                        key={node.id}
                                        transform={`translate(${node.x}, ${node.y})`}
                                        onMouseDown={(e) => handleNodeMouseDown(e, node.id)}
                                        onMouseEnter={() => setHoveredNode(node.id)}
                                        onMouseLeave={() => setHoveredNode(null)}
                                        style={{ cursor: isTarget || isPendingTarget || isBranchTarget ? 'pointer' : 'grab' }}
                                    >
                                        {/* Node card */}
                                        <rect
                                            width={NODE_WIDTH}
                                            height={NODE_HEIGHT}
                                            rx={12}
                                            ry={12}
                                            className={
                                                isSource
                                                    ? 'fill-blue-100 stroke-blue-500 dark:fill-blue-900/50 dark:stroke-blue-400'
                                                    : isPendingTarget
                                                      ? 'fill-blue-50 stroke-blue-400 stroke-2 dark:fill-blue-900/30 dark:stroke-blue-500'
                                                      : isConnectingToLinkSource
                                                        ? 'fill-violet-100 stroke-violet-500 dark:fill-violet-900/50 dark:stroke-violet-400'
                                                        : isTarget || isBranchTarget
                                                          ? 'fill-emerald-50 stroke-emerald-400 stroke-2 dark:fill-emerald-900/30 dark:stroke-emerald-500'
                                                          : 'fill-white stroke-gray-300 dark:fill-gray-800 dark:stroke-gray-600'
                                            }
                                            strokeWidth={isSource || isPendingTarget ? 2.5 : 1.5}
                                            filter="url(#shadow)"
                                        />

                                        {/* Avatar circle */}
                                        <clipPath id={`avatar-clip-${node.id}`}>
                                            <circle cx={28} cy={NODE_HEIGHT / 2} r={16} />
                                        </clipPath>
                                        {node.avatar_url ? (
                                            <image
                                                href={node.avatar_url}
                                                x={12}
                                                y={NODE_HEIGHT / 2 - 16}
                                                width={32}
                                                height={32}
                                                clipPath={`url(#avatar-clip-${node.id})`}
                                            />
                                        ) : (
                                            <circle
                                                cx={28}
                                                cy={NODE_HEIGHT / 2}
                                                r={16}
                                                className="fill-emerald-100 dark:fill-emerald-900"
                                            />
                                        )}

                                        {/* Text */}
                                        <text
                                            x={52}
                                            y={NODE_HEIGHT / 2 - 6}
                                            className="fill-gray-800 text-[11px] font-semibold dark:fill-gray-200"
                                            dominantBaseline="auto"
                                        >
                                            {(node.display_name ?? node.position).slice(0, 18)}
                                        </text>
                                        <text
                                            x={52}
                                            y={NODE_HEIGHT / 2 + 10}
                                            className="fill-gray-500 text-[9px] dark:fill-gray-400"
                                            dominantBaseline="auto"
                                        >
                                            {node.position.slice(0, 22)}
                                        </text>

                                        {/* Connector buttons — shown on hover when idle */}
                                        {!isConnectingMode && !isConnectingToLinkMode && pendingTarget === null && (
                                            <g style={{ opacity: hoveredNode === node.id ? 1 : 0, transition: 'opacity 0.15s' }}>
                                                {/* Green + buttons: connect node to node */}
                                                {(Object.keys(FROM_SIDE_OFFSETS) as FromSide[]).map((side) => {
                                                    const off = FROM_SIDE_OFFSETS[side];
                                                    return (
                                                        <g
                                                            key={side}
                                                            className="cursor-pointer"
                                                            transform={`translate(${off.x}, ${off.y})`}
                                                            onClick={(e) => handleConnectStart(e, node.id, side)}
                                                        >
                                                            <circle cx={8} cy={8} r={8} className="fill-emerald-500 stroke-white stroke-2" />
                                                            <title>{FROM_SIDE_LABELS[side]}</title>
                                                            <text x={8} y={13} textAnchor="middle" className="fill-white text-[12px] font-bold select-none">+</text>
                                                        </g>
                                                    );
                                                })}
                                                {/* Violet ⤵ buttons: connect node to an existing link */}
                                                {(Object.keys(FROM_SIDE_OFFSETS) as FromSide[]).map((side) => {
                                                    const off = FROM_SIDE_OFFSETS[side];
                                                    const extra = side === 'top' ? { x: 0, y: -20 }
                                                        : side === 'bottom' ? { x: 0, y: 20 }
                                                        : side === 'left' ? { x: -20, y: 0 }
                                                        : { x: 20, y: 0 };
                                                    return (
                                                        <g
                                                            key={`tolink-${side}`}
                                                            className="cursor-pointer"
                                                            transform={`translate(${off.x + extra.x}, ${off.y + extra.y})`}
                                                            onClick={(e) => handleConnectToLinkStart(e, node.id, side)}
                                                        >
                                                            <circle cx={8} cy={8} r={8} className="fill-violet-500 stroke-white stroke-2" />
                                                            <title>Sambung ke garis ({FROM_SIDE_LABELS[side]})</title>
                                                            <text x={8} y={13} textAnchor="middle" className="fill-white text-[10px] font-bold select-none">⤵</text>
                                                        </g>
                                                    );
                                                })}
                                            </g>
                                        )}

                                        {/* Side picker — shown on pending target node */}
                                        {isPendingTarget && (
                                            <g>
                                                {(Object.keys(TO_SIDE_OFFSETS) as ToSide[]).map((side) => {
                                                    const off = TO_SIDE_OFFSETS[side];
                                                    const arrow = side === 'left' ? '←' : side === 'right' ? '→' : '↑';
                                                    return (
                                                        <g
                                                            key={side}
                                                            className="cursor-pointer"
                                                            transform={`translate(${off.x}, ${off.y})`}
                                                            onClick={(e) => handlePickTargetSide(e, side)}
                                                        >
                                                            <circle cx={8} cy={8} r={8} className="fill-blue-500 stroke-white stroke-2" />
                                                            <title>{TO_SIDE_LABELS[side]}</title>
                                                            <text x={8} y={13} textAnchor="middle" className="fill-white text-[8px] font-bold select-none">{arrow}</text>
                                                        </g>
                                                    );
                                                })}
                                            </g>
                                        )}

                                    </g>
                                );
                            })}
                        </g>
                    </svg>

                    {/* Edit connector panel */}
                    {editingLink && editingLinkData && (() => {
                        const canvasBounds = svgRef.current?.getBoundingClientRect();
                        const panelLeft = editingLink.screenX - (canvasBounds?.left ?? 0);
                        const panelTop  = editingLink.screenY - (canvasBounds?.top ?? 0);
                        const current = editingLinkData;
                        return (
                            <div
                                className="absolute z-10 min-w-50 rounded-xl border bg-background shadow-lg"
                                style={{ left: panelLeft, top: panelTop, transform: 'translate(-50%, 16px)' }}
                                onMouseDown={(e) => e.stopPropagation()}
                            >
                                <div className="border-b px-3 py-2 flex items-center justify-between">
                                    <span className="text-xs font-semibold">Edit Konektor</span>
                                    <button
                                        className="text-muted-foreground hover:text-foreground text-xs leading-none"
                                        onClick={() => setEditingLink(null)}
                                    >
                                        ×
                                    </button>
                                </div>
                                <div className="px-3 py-2 space-y-2">
                                    <div>
                                        <p className="text-[10px] text-muted-foreground mb-1">Keluar dari sisi</p>
                                        <div className="flex gap-1 flex-wrap">
                                            {(Object.keys(FROM_SIDE_LABELS) as FromSide[]).map((side) => (
                                                <button
                                                    key={side}
                                                    className={`rounded px-2 py-0.5 text-[10px] font-medium border transition-colors ${current.fromSide === side ? 'bg-blue-500 text-white border-blue-500' : 'border-border text-muted-foreground hover:border-blue-400 hover:text-blue-500'}`}
                                                    onClick={() => handleUpdateLinkSides(current.target.id, side, current.toSide)}
                                                >
                                                    {FROM_SIDE_LABELS[side]}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-muted-foreground mb-1">Masuk dari sisi</p>
                                        <div className="flex gap-1 flex-wrap">
                                            {(Object.keys(TO_SIDE_LABELS) as ToSide[]).map((side) => (
                                                <button
                                                    key={side}
                                                    className={`rounded px-2 py-0.5 text-[10px] font-medium border transition-colors ${current.toSide === side ? 'bg-blue-500 text-white border-blue-500' : 'border-border text-muted-foreground hover:border-blue-400 hover:text-blue-500'}`}
                                                    onClick={() => handleUpdateLinkSides(current.target.id, current.fromSide, side)}
                                                >
                                                    {TO_SIDE_LABELS[side]}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })()}

                    {/* Legend */}
                    <div className="absolute bottom-4 left-4 rounded-lg border bg-background/90 p-3 text-xs shadow-sm backdrop-blur">
                        <p className="mb-1 font-medium">Petunjuk:</p>
                        <ul className="space-y-0.5 text-muted-foreground">
                            <li>Drag node untuk memindahkan posisi</li>
                            <li>Scroll untuk zoom, drag canvas untuk geser</li>
                            <li>Hover node, klik <span className="mx-0.5 inline-block rounded-full bg-emerald-500 px-1 text-white">+</span> di sisi yang diinginkan, lalu pilih sisi masuk di node tujuan</li>
                            <li>Hover garis, klik <span className="mx-0.5 inline-block rounded-full bg-white px-1 text-amber-500 outline outline-amber-400">+</span> untuk tambah node dari garis, <span className="mx-0.5 inline-block rounded-full bg-white px-1 text-blue-500 outline outline-blue-400">✎</span> edit konektor, <span className="mx-0.5 inline-block rounded-full bg-white px-1 text-red-500 outline outline-red-400">×</span> putus</li>
                            <li>Hover node, klik <span className="mx-0.5 inline-block rounded-full bg-violet-500 px-1 text-white">⤵</span> di sisi yang diinginkan, lalu klik garis tujuan untuk menyambungkan node ke garis tersebut</li>
                        </ul>
                    </div>

                    {/* Node count */}
                    <div className="absolute right-4 bottom-4 rounded-lg border bg-background/90 px-3 py-2 text-xs shadow-sm backdrop-blur">
                        {designNodes.length} node
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminOrganizationNodesDesign;
