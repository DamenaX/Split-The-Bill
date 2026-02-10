import MobileContainer from '../components/MobileContainer'
import Heading from '../components/text/Heading'
import TextInput from '../components/form/TextInput'
import Button from '../components/buttons/Button'
import MainContainer from '../components/MainContainer'

function AddGroup() {
    return (
        <MainContainer>
            <MobileContainer>
                <Heading tagName="h1" level="1"> Hello </Heading>
                <form>
                    <TextInput placeholder="Group name" isRequired={false} variant="default-wide" label="Hello" />
                    <Button variant="h"> Hello </Button>
                </form>
            </MobileContainer>
        </MainContainer>
    );
}

export default AddGroup