import MobileContainer from '../components/MobileContainer'
import Heading from '../components/text/Heading'
import TextInput from '../components/form/TextInput'
import Button from '../components/buttons/Button'

function AddGroup() {
    return (
        <div className="flex flex-col justify-center items-center w-full h-[80dvh] max-w-sm mx-auto p-6 bg-gray-100">
            <h1 className="text-4xl font-bold text-center mb-8">Add a Group to Get Started.</h1>
            <form className="flex flex-col justify-center items-center w-full">
                <input type="text" placeholder="Group Name" className="w-full p-2 border mb-6"></input>
                <button type="submit" className="w-full bg-emerald-500 p-2 text-center">Add a Group</button>
            </form>

            <MobileContainer>
                <Heading level="h1" text="" />
                <form>
                    <TextInput placeholder="" variant="wide-l" />
                    <Button text="" variant="" />
                </form>
            </MobileContainer>

        </div>
    );
}

export default AddGroup