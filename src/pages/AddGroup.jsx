import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MobileContainer from '../components/MobileContainer'
import Heading from '../components/text/Heading'
import TextInput from '../components/form/TextInput'
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
        createGroup({ name: name.trim() })
        // find created group id (last in list)
        const g = state.groups[state.groups.length - 1]
        // there is a slight chance state not updated synchronously; safer to read from localStorage
        const raw = localStorage.getItem('split-the-bill:v1')
        if (raw) {
            try {
                const parsed = JSON.parse(raw)
                const last = parsed.groups && parsed.groups[parsed.groups.length - 1]
                if (last && last.id) {
                    navigate(`/groups/${last.id}`)
                    return
                }
            } catch (e) {}
        }
        if (g && g.id) navigate(`/groups/${g.id}`)
    }

    return (
        <MainContainer>
            <MobileContainer variant="centered">
                <Heading tagName="h1" level="1" className="mb-9"> Add a group to get started </Heading>
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