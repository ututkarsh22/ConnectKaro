import { LANGUAGE_TO_FLAG } from "../constants/allthings";

export default function getLanguageFlag(lang){
 if(!lang) return null;

 const lang_lower = lang.toLowerCase();
 const country_code = LANGUAGE_TO_FLAG[lang_lower];

 if(country_code){
    return(
        <img src = {`https://flagcdn.com/24x18/${country_code}.png`}
        alt={`${lang_lower} flag`}
        className='h-3 mr-1 inline-block'/>
    )
 }
return null;

}