import { useState } from "react";
import MainContainer from "../components/MainContainer";
import MobileContainer from "../components/MobileContainer";
import Button from "../components/buttons/Button";
import Heading from "../components/text/Heading";
import TextInput from "../components/form/TextInput";
import cancelicon from "../assets/cancel.svg";

function AddMembers() {
    // Initialize with a unique ID (0)
    const [members, setMembers] = useState([0]);

    function addMember() {
        // Use the functional update and find the max ID to ensure uniqueness
        setMembers(prevMembers => {
            const nextId = prevMembers.length > 0 ? Math.max(...prevMembers) + 1 : 0;
            return [...prevMembers, nextId];
        });
    }

    function removeMember(idToRemove) {
        // Filter out the specific ID. This is cleaner than splice.
        setMembers(prevMembers => prevMembers.filter(id => id !== idToRemove));
    }

    return (
        <MainContainer>
            <MobileContainer variant="centered">
                <Heading tagName="h1" level="1" className="mb-8">Add the names of the Group Members</Heading>
                <form className='w-full space-y-8'>
                    <div className="space-y-1">
                        {members.map((memberId, index) => {
                            return (
                                <div key={memberId} className="flex w-full space-x-2 items-center">
                                    <TextInput 
                                        variant="medium" 
                                        placeholder="Name" 
                                        isRequired={true} 
                                    />
                                    {/* Only show the remove button for items after the first one */}
                                    {index !== 0 && (
                                        <button 
                                            type="button" 
                                            onClick={() => removeMember(memberId)}
                                        >
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