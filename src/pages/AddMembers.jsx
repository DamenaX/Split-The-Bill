import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom'
import MainContainer from "../components/MainContainer";
import MobileContainer from "../components/MobileContainer";
import Button from "../components/buttons/Button";
import Heading from "../components/text/Heading";
import cancelicon from "../assets/cancel.svg";
import { useGroups } from '../state/GroupsProvider'

function makeId() { return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}` }

function AddMembers() {
        const { groupId } = useParams()
    const navigate = useNavigate()
    const { getGroupById, addMembers } = useGroups()

        const [existingMembers, setExistingMembers] = useState([])
        const [members, setMembers] = useState([{ id: makeId(), name: '' }])

        useEffect(() => {
            if (!groupId) return
            const g = getGroupById(groupId)
            if (g && g.members && g.members.length) {
                // show existing members separately; the form only adds new members
                setExistingMembers(g.members.map(m => ({ id: m.id, name: m.name })))
            }
        }, [groupId])

    function addMember() {
        setMembers(prev => [...prev, { id: makeId(), name: '' }])
    }

    function removeMember(idToRemove) {
        setMembers(prev => prev.filter(m => m.id !== idToRemove))
    }

    function updateName(id, value) {
        setMembers(prev => prev.map(m => m.id === id ? { ...m, name: value } : m))
    }

    function onSubmit(e) {
        e.preventDefault()
        const payload = members.filter(m => m.name && m.name.trim()).map(m => ({ id: m.id, name: m.name.trim() }))
        if (!payload.length) return
        addMembers(groupId, payload)
        navigate(`/groups/${groupId}`)
    }

    return (
        <MainContainer>
            <MobileContainer variant="scroll">
                <Heading tagName="h1" level="1" className="mb-8">Add the names of the Group Members</Heading>
                <form className='w-full space-y-8' onSubmit={onSubmit}>
                        {existingMembers && existingMembers.length > 0 && (
                            <div className="w-full rounded-md bg-gray-50 border border-gray-200 px-4 py-2">
                                <p className="mb-2 text-gray-500">Existing members:</p>
                                <ul className="">
                                    {existingMembers.map(m => <li key={m.id} className="py-1">{m.name}</li>)}
                                </ul>
                            </div>
                        )}
                    <div className="space-y-1 w-full">
                        {members.map((member, index) => {
                            return (
                                <div key={member.id} className="flex w-full space-x-2 items-center">
                                    <input value={member.name} onChange={e => updateName(member.id, e.target.value)} placeholder="Name" required className="flex-1 border border-gray-300 px-3 py-2 rounded" />
                                    {index !== 0 && (
                                        <button type="button" onClick={() => removeMember(member.id)}>
                                            <img src={cancelicon} alt="remove" width="16px" height="16px"/>
                                        </button>
                                    )}
                                </div>
                            );
                        })}
                        <Button type="button" variant="link" onClick={addMember}>
                            Add Another person
                        </Button>
                    </div>
                    <Button type="submit" variant="default">Finish Adding</Button>
                </form>
            </MobileContainer>
        </MainContainer>
    );
}

export default AddMembers;