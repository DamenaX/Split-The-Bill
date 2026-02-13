import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import MobileContainer from '../components/MobileContainer'
import Heading from '../components/text/Heading'
import Button from '../components/buttons/Button'
import MainContainer from '../components/MainContainer'
import { useGroups } from '../state/GroupsProvider'

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
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                                                </svg>
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
                            <div className="flex flex-col items-center justify-center p-8 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-center">
                                <div className="p-3 bg-white rounded-full shadow-sm mb-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-slate-400">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 5.472m0 0a5.995 5.995 0 00-4.512 4.287m5.823-1.43a6.008 6.008 0 01-5.824-3.379ZM14.75 7.5a.75.75 0 11-1.5 0 .75.75 0 011.5 0ZM14.25 10.5a.75.75 0 11-1.5 0 .75.75 0 011.5 0ZM19 19v-.75a.75.75 0 00-.75-.75H18.75" />
                                    </svg>
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