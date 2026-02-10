import MobileContainer from '../components/MobileContainer'
import Heading from '../components/text/Heading'
import TextInput from '../components/form/TextInput'
import Button from '../components/buttons/Button'
import MainContainer from '../components/MainContainer'

function AddGroup() {
    return (
        <MainContainer>
            <MobileContainer variant="centered">
                <Heading tagName="h1" level="1" className="mb-9"> Add a group to get started </Heading>
                <form className='w-full space-y-3'>
                    <TextInput placeholder="Group name" isRequired={false} variant="default-wide"  />
                    <Button variant="default" type="submit"> Hello </Button>
                </form>
            </MobileContainer>
        </MainContainer>
    );
}

export default AddGroup