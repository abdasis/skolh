import { useMemo } from 'react';
import { PersonCard } from './person-card';
import { type TreeNode } from './types';

interface Props {
    node: TreeNode;
    registerCard: (id: number, el: HTMLDivElement | null) => void;
    isRoot?: boolean;
}

const NodeBranch = ({ node, registerCard, isRoot = false }: Props) => {
    const leftChildren = node.children.filter((c) => c.data.branch_side === 'left');
    const rightChildren = node.children.filter((c) => c.data.branch_side === 'right');
    const centerChildren = node.children.filter((c) => c.data.branch_side === 'center');
    const hasCenterChildren = centerChildren.length > 0;
    const hasSideChildren = leftChildren.length > 0 || rightChildren.length > 0;
    const connectorFrom = node.data.connector_from;

    // Group side children by sort_order into paired rows
    const sideRows = useMemo(() => {
        if (!hasSideChildren) return [];
        const allSide = [...leftChildren, ...rightChildren];
        const sortOrders = [...new Set(allSide.map((c) => c.data.sort_order))].sort((a, b) => a - b);
        return sortOrders.map((so) => ({
            left: leftChildren.find((c) => c.data.sort_order === so) ?? null,
            right: rightChildren.find((c) => c.data.sort_order === so) ?? null,
        }));
    }, [leftChildren, rightChildren, hasSideChildren]);

    const firstSideRow = sideRows[0] ?? null;
    const remainingSideRows = sideRows.slice(1);

    // Render center children layout
    const centerLayout = hasCenterChildren ? (
        centerChildren.length > 3 ? (
            <GridLayout nodes={centerChildren} registerCard={registerCard} />
        ) : (
            <RowLayout nodes={centerChildren} registerCard={registerCard} />
        )
    ) : null;

    // Side section: grid with left | card | right
    const sideSection = hasSideChildren ? (
        <div className="grid" style={{ gridTemplateColumns: '1fr auto 1fr' }}>
            {/* Row 1: left side — card — right side */}
            <div className="flex items-center justify-end py-2">
                {firstSideRow?.left && (
                    <PersonCard
                        node={firstSideRow.left}
                        ref={(el) => registerCard(firstSideRow.left!.data.id, el)}
                    />
                )}
            </div>
            <div className="flex justify-center px-8">
                <PersonCard
                    node={node}
                    isRoot={isRoot}
                    ref={(el) => registerCard(node.data.id, el)}
                />
            </div>
            <div className="flex items-center justify-start py-2">
                {firstSideRow?.right && (
                    <PersonCard
                        node={firstSideRow.right}
                        ref={(el) => registerCard(firstSideRow.right!.data.id, el)}
                    />
                )}
            </div>

            {/* Remaining side rows */}
            {remainingSideRows.map((row, i) => (
                <>
                    <div key={`left-${i}`} className="flex items-center justify-end py-2">
                        {row.left && (
                            <PersonCard
                                node={row.left}
                                ref={(el) => registerCard(row.left!.data.id, el)}
                            />
                        )}
                    </div>
                    <div key={`center-${i}`} className="px-8" />
                    <div key={`right-${i}`} className="flex items-center justify-start py-2">
                        {row.right && (
                            <PersonCard
                                node={row.right}
                                ref={(el) => registerCard(row.right!.data.id, el)}
                            />
                        )}
                    </div>
                </>
            ))}
        </div>
    ) : (
        <PersonCard
            node={node}
            isRoot={isRoot}
            ref={(el) => registerCard(node.data.id, el)}
        />
    );

    // Layout based on connector_from
    if (connectorFrom === 'left' && centerLayout) {
        return (
            <div className="flex items-start gap-4">
                {centerLayout}
                {sideSection}
            </div>
        );
    }

    if (connectorFrom === 'right' && centerLayout) {
        return (
            <div className="flex items-start gap-4">
                {sideSection}
                {centerLayout}
            </div>
        );
    }

    if (connectorFrom === 'top' && centerLayout) {
        return (
            <div className="flex flex-col items-center gap-8">
                {centerLayout}
                {sideSection}
            </div>
        );
    }

    // Default: bottom
    return (
        <div className="flex flex-col items-center gap-8">
            {sideSection}
            {centerLayout}
        </div>
    );
};

// Simple row layout for <= 3 center children
const RowLayout = ({ nodes, registerCard }: { nodes: TreeNode[]; registerCard: Props['registerCard'] }) => {
    return (
        <div className="flex items-start justify-center gap-8">
            {nodes.map((child) => (
                <div key={child.data.id} className="flex flex-col items-center">
                    <NodeBranch node={child} registerCard={registerCard} />
                </div>
            ))}
        </div>
    );
};

// Grid layout for > 3 center children (3 per row)
const GridLayout = ({ nodes, registerCard }: { nodes: TreeNode[]; registerCard: Props['registerCard'] }) => {
    const rows: TreeNode[][] = [];
    for (let i = 0; i < nodes.length; i += 3) {
        rows.push(nodes.slice(i, i + 3));
    }

    return (
        <div className="flex flex-col items-center gap-8">
            {rows.map((row, rowIndex) => (
                <div key={rowIndex} className="flex items-start justify-center gap-0">
                    {row.map((child) => (
                        <div key={child.data.id} className="flex w-72 flex-col items-center">
                            <NodeBranch node={child} registerCard={registerCard} />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export { NodeBranch };
