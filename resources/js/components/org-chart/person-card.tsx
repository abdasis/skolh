import { forwardRef } from 'react';
import { type TreeNode } from './types';

interface Props {
    node: TreeNode;
    isRoot?: boolean;
}

const PersonCard = forwardRef<HTMLDivElement, Props>(({ node, isRoot = false }, ref) => {
    const { data } = node;

    const avatarSize = isRoot ? 'h-16 w-16' : 'h-12 w-12';
    const avatarIconSize = isRoot ? 'h-8 w-8' : 'h-5 w-5';

    return (
        <div ref={ref} className="flex items-center">
            <div
                className={`relative z-10 shrink-0 ${avatarSize} overflow-hidden rounded-full border-4 border-emerald-700 bg-emerald-100 shadow-md`}
                style={{ marginRight: isRoot ? '-2rem' : '-1.5rem' }}
            >
                {data.avatar_url ? (
                    <img
                        src={data.avatar_url}
                        alt={data.display_name ?? data.position}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-emerald-200 dark:bg-emerald-900">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={`text-emerald-700 ${avatarIconSize}`}
                        >
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                        </svg>
                    </div>
                )}
            </div>

            <div className={`rounded-full bg-emerald-700 shadow-md ${isRoot ? 'min-w-50 py-3 pl-10 pr-5' : 'min-w-40 py-2 pl-8 pr-4'}`}>
                <p className={`whitespace-nowrap font-bold leading-snug text-white ${isRoot ? 'text-sm' : 'text-xs'}`}>
                    {data.display_name ?? data.position}
                </p>
                {data.display_name && (
                    <p className={`text-emerald-200 ${isRoot ? 'text-xs' : 'text-[11px]'}`}>
                        {data.position}
                    </p>
                )}
                {data.nip && (
                    <p className="text-[10px] text-emerald-300">
                        NIP {data.nip}
                    </p>
                )}
            </div>
        </div>
    );
});

PersonCard.displayName = 'PersonCard';

export { PersonCard };
