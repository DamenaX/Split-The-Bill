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
    const { state, createGroup } = useGroups()

    function onSubmit(e) {
        e.preventDefault()
        if (!name.trim()) return
        const id = createGroup({ name: name.trim() })
        if (id) navigate(`/groups/${id}`)
    }

    const groups = state?.groups || []

    return (
        <MainContainer>
            <MobileContainer variant="centered">
                <Heading tagName="h1" level="1" className="mb-6"> Split the Bill </Heading>

                {groups.length ? (
                    <div className="w-full mb-6">
                        <h2 className="text-lg font-semibold mb-2">Your groups</h2>
                        <ul className="space-y-2">
                            {groups.map(g => (
                                <li key={g.id} className="border p-3 rounded flex justify-between items-center">
                                    <div>
                                        <div className="font-medium">{g.name}</div>
                                        <div className="text-sm text-gray-500">{g.members.length} members</div>
                                    </div>
                                    <div className="space-x-2">
                                        <button onClick={() => navigate(`/groups/${g.id}`)} className="text-emerald-600">Open</button>
                                        <Link to={`/groups/${g.id}/add-members`} className="text-blue-500">Add members</Link>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <div className="w-full mb-6 text-center text-gray-600">
                        <p className="mb-2">You don't have any groups yet.</p>
                        <p>Get started by creating one below.</p>
                    </div>
                )}

                <form className='w-full space-y-3' onSubmit={onSubmit}>
                    <div className="flex flex-col w-full">
                        <label htmlFor="group-name">Group name</label>
                        <input id="group-name" value={name} onChange={e => setName(e.target.value)} className="border px-3 py-2 rounded" placeholder="Group name" required />
                    </div>
                    <Button variant="default" type="submit"> Create Group </Button>
                </form>
            </MobileContainer>
        </MainContainer>
    );
}

export default AddGroup