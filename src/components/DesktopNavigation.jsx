import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useGroups } from '../state/GroupsProvider'
import dropDownIcon from "../assets/dropdown-arrow.svg";

function DesktopNavigation({ onLinkClick, className = "" }) {
    const { state } = useGroups()
    const groups = state?.groups || []

    // Get active group ID from URL
    const { groupId } = useParams()

    // Auto-open groups if we are in a group view
    const [isGroupsOpen, setIsGroupsOpen] = useState(!!groupId)

    // Update state if groupId changes (optional, but good for navigation)
    useEffect(() => {
        if (groupId) setIsGroupsOpen(true)
    }, [groupId])

    const navigate = useNavigate()

    const handleLinkClick = () => {
        if (onLinkClick) onLinkClick()
    }

    return (
        <div className={`flex flex-col w-64 h-full border-r border-gray-200 bg-gray-50 p-4 space-y-4 ${className}`}>
            <h1 className="text-xl font-bold mb-4 text-emerald-700">Split the Bill</h1>

            <nav className="space-y-2">
                <Link to="/" onClick={handleLinkClick} className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md">
                    Home
                </Link>

                <div>
                    <button
                        onClick={() => setIsGroupsOpen(!isGroupsOpen)}
                        className="flex items-center justify-between w-full px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md"
                    >
                        <span>Groups</span>
                        <img
                            src={dropDownIcon}
                            alt="toggle"
                            className={`w-4 h-4 transition-transform ${isGroupsOpen ? 'rotate-180' : ''}`}
                        />
                    </button>

                    {isGroupsOpen && (
                        <div className="ml-4 mt-2 space-y-1">
                            {groups.length === 0 ? (
                                <p className="px-4 py-2 text-sm text-gray-500">No groups yet</p>
                            ) : (
                                groups.map(group => {
                                    const isActive = String(group.id) === String(groupId)
                                    return (
                                        <Link
                                            key={group.id}
                                            to={`/groups/${group.id}`}
                                            onClick={handleLinkClick}
                                            className={`block px-4 py-2 text-sm transition-colors ${isActive
                                                ? "border-b-1 border-emerald-700 text-emerald-700 font-medium"
                                                : "text-gray-600 hover:text-emerald-600 hover:bg-gray-100"
                                                }`}
                                        >
                                            {group.name}
                                        </Link>
                                    )
                                })
                            )}
                        </div>
                    )}
                </div>

                <div className="px-4 py-2 text-gray-400 cursor-not-allowed" title="Coming Soon">
                    Friends <span className="text-xs border border-gray-300 rounded px-1 ml-2">Soon</span>
                </div>

                <div className="px-4 py-2 text-gray-400 cursor-not-allowed" title="Coming Soon">
                    Settings <span className="text-xs border border-gray-300 rounded px-1 ml-2">Soon</span>
                </div>
            </nav>
        </div>
    )
}

export default DesktopNavigation
