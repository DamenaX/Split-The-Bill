import { useParams } from 'react-router-dom';
import { useGroups } from '../state/GroupsProvider';
import DesktopNavigation from './DesktopNavigation';
import BalanceTab from './BalanceTab';

function MainContainer({ children }) {
    const { groupId } = useParams();
    const { getGroupById } = useGroups();
    const group = groupId ? getGroupById(groupId) : null;

    return (
        <div className="w-dvw h-dvh flex justify-center items-center overflow-hidden bg-gray-50">
            {/* Desktop Layout */}
            <div className="hidden md:flex w-full h-full">
                {/* Left Panel - Navigation (Fills space, aligns content to right) */}
                <div className="flex-[1] flex justify-end bg-gray-50 border-r border-gray-200 min-w-[220px]">
                    <DesktopNavigation />
                </div>

                {/* Center Panel - Content (Max 600px, shrinks if needed) */}
                <div className="w-full max-w-[600px] flex justify-center bg-white overflow-y-auto border-r border-gray-200 shadow-sm z-10">
                    {children}
                </div>

                {/* Right Panel - Balances (Fills space, aligns content to left) */}
                <div className="hidden lg:flex flex-1 justify-start bg-gray-50 min-w-[400px]">
                    <div className="w-96 h-full p-4 overflow-y-auto">
                        {group ? (
                            <>
                                <h2 className="text-lg font-semibold mb-4 text-emerald-700">Balances</h2>
                                <BalanceTab group={group} />
                            </>
                        ) : (
                            <div className="h-full flex items-center justify-center text-gray-400">
                                Select a group to view balances
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden w-full h-full flex justify-center items-center">
                {children}
            </div>
        </div>
    )
}

export default MainContainer