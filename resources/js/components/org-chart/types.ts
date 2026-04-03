import { type OrganizationNodeResource } from '@/types';

export interface TreeNode {
    data: OrganizationNodeResource;
    children: TreeNode[];
}

export interface Point {
    x: number;
    y: number;
}

export interface ConnectorPath {
    id: string;
    d: string;
    dashed: boolean;
}

export interface ConnectorDot {
    id: string;
    point: Point;
}

export const buildTree = (nodes: OrganizationNodeResource[]): TreeNode | null => {
    const sorted = [...nodes].sort((a, b) => a.sort_order - b.sort_order);
    const map = new Map<number, TreeNode>();

    for (const node of sorted) {
        map.set(node.id, { data: node, children: [] });
    }

    const roots: TreeNode[] = [];

    for (const node of sorted) {
        const treeNode = map.get(node.id)!;
        if (node.parent_id === null) {
            roots.push(treeNode);
        } else {
            map.get(node.parent_id)?.children.push(treeNode);
        }
    }

    if (roots.length === 0) return null;
    if (roots.length === 1) return roots[0];

    const virtualRoot: TreeNode = {
        data: {
            id: -1,
            parent_id: null,
            teacher_id: null,
            position: '',
            name: null,
            nip: null,
            sort_order: 0,
            branch_side: 'center',
            connector_from: 'bottom',
            position_x: null,
            position_y: null,
            avatar_url: null,
            display_name: null,
            is_broken_link: false,
            created_at: '',
            updated_at: '',
        },
        children: roots,
    };

    return virtualRoot;
};
