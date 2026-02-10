import MainContainer from "../components/MainContainer"
import MobileContainer from "../components/MobileContainer"
import Button from "../components/buttons/Button"
import Heading from "../components/text/Heading"
import TextInput from "../components/form/TextInput"



function AddMembers() {
    return (
        <MainContainer>
            <MobileContainer>
                <Heading tagName="h1" level="1" className="mb-8">Add the names of the Group Members</Heading>
                <form className='w-full space-y-8'>
                    <div>
                        <TextInput placeholder="Name" isRequired={true} />
                        <Button type="button" variant="link">Add Another person</Button>
                    </div>
                    <Button type="submit" variant="default">Finish Adding</Button>
                </form>
            </MobileContainer>
        </MainContainer>
    )
}

export default AddMembers