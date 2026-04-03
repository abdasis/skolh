import { useLayoutEffect, useState, type RefObject } from 'react';
import { type ConnectorDot, type ConnectorPath, type TreeNode } from './types';
import { getAnchorPoint, horizontalPath, straightVerticalPath, verticalPath } from './path-utils';

interface ConnectorResult {
    paths: ConnectorPath[];
    dots: ConnectorDot[];
}

const getExitSide = (connectorFrom: string): 'top' | 'bottom' | 'left' | 'right' => {
    if (connectorFrom === 'top' || connectorFrom === 'left' || connectorFrom === 'right') {
        return connectorFrom;
    }
    return 'bottom';
};

const getEntrySide = (branchSide: string): 'top' | 'bottom' | 'left' | 'right' => {
    switch (branchSide) {
        case 'left':
            return 'right';
        case 'right':
            return 'left';
        default:
            return 'top';
    }
};

const walkTree = (
    node: TreeNode,
    cardRefs: Map<number, HTMLDivElement>,
    containerRect: DOMRect,
    paths: ConnectorPath[],
    dots: ConnectorDot[],
) => {
    if (node.data.id === -1) {
        for (const child of node.children) {
            walkTree(child, cardRefs, containerRect, paths, dots);
        }
        return;
    }

    const parentEl = cardRefs.get(node.data.id);
    if (!parentEl) return;

    const parentRect = parentEl.getBoundingClientRect();
    const exitSide = getExitSide(node.data.connector_from);

    const centerChildren = node.children.filter((c) => c.data.branch_side === 'center');
    const sideChildren = node.children.filter((c) => c.data.branch_side !== 'center');

    // Center children: draw connector from parent exit side to child top
    if (centerChildren.length > 0) {
        const parentAnchor = getAnchorPoint(parentRect, exitSide, containerRect);

        // Single center child
        if (centerChildren.length === 1) {
            const child = centerChildren[0];
            const childEl = cardRefs.get(child.data.id);
            if (childEl) {
                const childRect = childEl.getBoundingClientRect();
                const childAnchor = getAnchorPoint(childRect, 'top', containerRect);
                paths.push({
                    id: `link-${node.data.id}-${child.data.id}`,
                    d: verticalPath(parentAnchor, childAnchor),
                    dashed: false,
                });
            }
        }

        // If multiple center children, draw a trunk line down then horizontal bridge
        if (centerChildren.length > 1) {
            const childEls = centerChildren
                .map((c) => ({ node: c, el: cardRefs.get(c.data.id) }))
                .filter((c): c is { node: TreeNode; el: HTMLDivElement } => !!c.el);

            if (childEls.length > 0) {
                const childRects = childEls.map((c) => c.el.getBoundingClientRect());
                const firstChildTop = Math.min(...childRects.map((r) => r.top - containerRect.top));
                const bridgeY = firstChildTop;

                // Trunk: parent to bridge level
                const trunkBottom = { x: parentAnchor.x, y: bridgeY };
                paths.push({
                    id: `trunk-${node.data.id}`,
                    d: straightVerticalPath(parentAnchor, trunkBottom),
                    dashed: false,
                });

                // Dot at trunk-bridge junction
                dots.push({
                    id: `dot-trunk-${node.data.id}`,
                    point: trunkBottom,
                });

                const rowSize = centerChildren.length > 3 ? 3 : centerChildren.length;
                const rows: typeof childEls[] = [];
                for (let i = 0; i < childEls.length; i += rowSize) {
                    rows.push(childEls.slice(i, i + rowSize));
                }

                rows.forEach((row, rowIndex) => {
                    const rowRects = row.map((c) => c.el.getBoundingClientRect());
                    const rowTop = Math.min(...rowRects.map((r) => r.top - containerRect.top));

                    // Vertical connector between rows
                    if (rowIndex > 0) {
                        const prevRow = rows[rowIndex - 1];
                        const prevRects = prevRow.map((c) => c.el.getBoundingClientRect());
                        const prevBottom = Math.max(...prevRects.map((r) => r.bottom - containerRect.top));
                        const rowJunction = { x: parentAnchor.x, y: rowTop };
                        paths.push({
                            id: `row-connector-${node.data.id}-${rowIndex}`,
                            d: straightVerticalPath(
                                { x: parentAnchor.x, y: prevBottom },
                                rowJunction,
                            ),
                            dashed: false,
                        });

                        // Dot at row junction
                        dots.push({
                            id: `dot-row-${node.data.id}-${rowIndex}`,
                            point: rowJunction,
                        });
                    }

                    // Horizontal bridge across the row
                    if (row.length > 1) {
                        const firstAnchor = getAnchorPoint(rowRects[0], 'top', containerRect);
                        const lastAnchor = getAnchorPoint(rowRects[rowRects.length - 1], 'top', containerRect);
                        paths.push({
                            id: `bridge-${node.data.id}-${rowIndex}`,
                            d: horizontalPath(
                                { x: firstAnchor.x, y: rowTop },
                                { x: lastAnchor.x, y: rowTop },
                            ),
                            dashed: false,
                        });
                    }

                    // Vertical drop to each child in the row
                    for (const child of row) {
                        const childRect = child.el.getBoundingClientRect();
                        const childAnchor = getAnchorPoint(childRect, 'top', containerRect);
                        if (rowTop < childAnchor.y) {
                            const dropStart = { x: childAnchor.x, y: rowTop };
                            paths.push({
                                id: `drop-${node.data.id}-${child.node.data.id}`,
                                d: straightVerticalPath(dropStart, childAnchor),
                                dashed: false,
                            });

                            // Dot at bridge-drop junction
                            dots.push({
                                id: `dot-drop-${node.data.id}-${child.node.data.id}`,
                                point: dropStart,
                            });
                        }
                    }
                });
            }
        }
    }

    // Side children: dashed horizontal lines with dot at midpoint
    for (const child of sideChildren) {
        const childEl = cardRefs.get(child.data.id);
        if (!childEl) continue;

        const childRect = childEl.getBoundingClientRect();
        const side = child.data.branch_side as 'left' | 'right';
        const parentSideAnchor = getAnchorPoint(parentRect, side, containerRect);
        const childEntrySide = getEntrySide(side);
        const childAnchor = getAnchorPoint(childRect, childEntrySide, containerRect);

        paths.push({
            id: `side-${node.data.id}-${child.data.id}`,
            d: horizontalPath(parentSideAnchor, childAnchor),
            dashed: true,
        });
    }

    // Recurse into all children
    for (const child of node.children) {
        walkTree(child, cardRefs, containerRect, paths, dots);
    }
};

export const useConnectorPaths = (
    tree: TreeNode | null,
    cardRefs: RefObject<Map<number, HTMLDivElement>>,
    containerRef: RefObject<HTMLDivElement | null>,
    _revision?: number,
): ConnectorResult => {
    const [result, setResult] = useState<ConnectorResult>({ paths: [], dots: [] });

    useLayoutEffect(() => {
        const compute = () => {
            if (!tree || !containerRef.current || !cardRefs.current) {
                setResult({ paths: [], dots: [] });
                return;
            }

            const containerRect = containerRef.current.getBoundingClientRect();
            const paths: ConnectorPath[] = [];
            const dots: ConnectorDot[] = [];
            walkTree(tree, cardRefs.current, containerRect, paths, dots);
            setResult({ paths, dots });
        };

        compute();

        const observer = new ResizeObserver(compute);
        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, [tree, cardRefs, containerRef, _revision]);

    return result;
};
