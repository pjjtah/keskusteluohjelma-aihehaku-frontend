import { React} from 'react'

function SuggestionList(props) {

        return (
            <ul >
                {Object.keys(props.suggestions).reverse().map((item) => (
                    <li key={item} >
                        {item}
                    </li>
                ))}
            </ul>
        )

}


export default SuggestionList