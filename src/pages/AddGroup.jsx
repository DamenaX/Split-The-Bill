import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import MobileContainer from '../components/MobileContainer'
import Heading from '../components/text/Heading'
import Button from '../components/buttons/Button'
import MainContainer from '../components/MainContainer'
import { useGroups } from '../state/GroupsProvider'
import emptyIcon from "../assets/empty.svg"
import arrow from "../assets/dropdown-arrow.svg"

function AddGroup() {
    const [name, setName] = useState('')
    const navigate = useNavigate()
    const { state, createGroup, deleteGroup } = useGroups()

    function onSubmit(e) {
        e.preventDefault()
        if (!name.trim()) return
        const id = createGroup({ name: name.trim() })
        if (id) navigate(`/groups/${id}`)
    }

    const groups = state?.groups || []

    return (
        <MainContainer>
            <MobileContainer variant="scrollable">
                <div className="w-full max-w-md mx-auto space-y-8 py-4">
                    <Heading tagName="h1" level="1" className="text-center text-emerald-800">Split the Bill</Heading>

                    {/* Group List Section */}
                    <section className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-slate-700">Your Groups</h2>
                            <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-1">
                                {groups.length}
                            </span>
                        </div>

                        {groups.length > 0 ? (
                            <ul className="space-y-3">
                                {groups.map(g => (
                                    <li
                                        key={g.id}
                                        onClick={() => navigate(`/groups/${g.id}`)}
                                        className="flex justify-between items-center border border-gray-400 px-3 py-3 rounded cursor-pointer hover:bg-gray-50 bg-white"
                                    >
                                        <div>
                                            <h3 className="font-semibold text-slate-800">
                                                {g.name}
                                            </h3>
                                            <p className="text-sm text-slate-500">
                                                {g.members.length} {g.members.length === 1 ? 'member' : 'members'}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <div className="text-slate-400">
                                                <img src={arrow} className="w-6 h-6 -rotate-90"/>
                                            </div>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    const ok = window.confirm(`Delete ${g.name}?`);
                                                    if (!ok) return;
                                                    deleteGroup(g.id);
                                                }}
                                                className="text-sm font-medium text-red-500 hover:text-red-700 px-2 py-1"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="flex flex-col items-center justify-center p-8  rounded-xl border border-dashed  text-center">
                                <div className="p-3 bg-white rounded-full shadow-sm mb-3">
                                    <img src={emptyIcon} className="w-6 h-6"/>
                                </div>
                                <p className="text-slate-600 font-medium">No groups yet</p>
                                <p className="text-slate-400 text-sm mt-1">Create a group to start splitting bills</p>
                            </div>
                        )}

                        <form className='w-full space-y-3' onSubmit={onSubmit}>
                            <div className="flex flex-col w-full">
                                <label htmlFor="group-name">Group name</label>
                                <input id="group-name" value={name} onChange={e => setName(e.target.value)} className="border border-gray-400 px-3 py-3 rounded" placeholder="Group name" required />
                            </div>
                            <Button variant="default" type="submit" className="w-full justify-center">
                                Create Group
                            </Button>
                        </form>
                    </section>
                </div>
            </MobileContainer>
        </MainContainer>
    );
}

export default AddGroup