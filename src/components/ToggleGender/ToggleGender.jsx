
const ToggleGender = ({toggleGender,setSelectedCategory,setSelectedSubcategory}) => {


    const handleGenderChange = (gender) => {
        toggleGender(gender);
        setSelectedCategory(null);  // Reset category
        setSelectedSubcategory(null);  // Reset subcategory
      };


    return (
        <div>

{/* toggleGender   i poaren anuma setSelectedGender -y vori state-i value  woomans -y vor -y vor yst paymani woomen or man*/}
            <div className="gender-toggle">
                <button onClick={() => handleGenderChange('woomans')}>
                    <img src='/assets/girl.png' />
                </button>
                <button onClick={() => handleGenderChange('mans')}>
                    <img src='/assets/man.png' />
                </button>

            </div>



        </div>
    )
}


export default ToggleGender