
//https://openbase.com/js/react-d3-cloud

import React, {useState, useEffect} from 'react';
// import { render } from 'react-dom';
import WordCloud from 'react-d3-cloud';
import { TagCloud } from 'react-tagcloud';
import formatCloudGroup from './helpers/formatCloudGroup';
import ECApi from './ECApi';

//you need to make this reactive for choices and add it to an array that
//will need to be fed back to the form
//can you make a bigger one to work as a background?
//need a useEffect to get emotion to make the cloud
// const emoArr = ['afraid','agitated','alarmed','antsy','anxious','apprehensive','cautious','concerned','cowardly','distressed','dread','edgy','fearful','foreboding','frazzled','fretful','frightened','guarded','hesitant','horrified','hysterical','jumpy','nervous','panic','paralyzed','paranoid','petrified','restless','scared','shaken','skeptical','startled','stressed','tense','terrified','timid','trepidation','twitchy','uptight','vigilant','wary','worried','angry','aggravated','animosity','annoyed','antagonistic','antipathy','bitter','bothered','burning','choleric','cold','consternation','contempt','cross','disgruntled','enmity','exasperated','frustrated','furious','grouchy','harassed','hostile','ill-tempered','impatient','indignant','irritated','irate','irascible','mad','miffed','moody','nasty','offended','outraged','peevish','perturbed','pissed','resentful','petulant','rage','rattled','resentment','sour','testy','tetchy','vexed','vindictive','wrathful','courageous','adventurous','audacious','bold','brave','capable','certain','cocky','confident','comfortable','daring','determined','fearless','free','grounded','gutsy','powerful','proud','resolute','strong','superior','tenacious','tough','valiant','vehement','worthy','disconnected','adrift','alienated','alone','aloof','bored','conflicted','consternated','cranky','denial','detached','disillusioned','disinterested','distant','distracted','empty','groggy','hollow','jaded','indifferent','isolated','lethargic','listless','lost','neutral','numb','powerless','preoccupied','puzzled','reluctance','removed','resignation','resistant','sheepish','shut','down','sluggish','sullen','torn','uneasy','withdrawn','dislike','abhorrence','aversion','detest','disdain','disgust','envious','grudging','hate','repugnance','revolted','scorn','embarrassed','appalled','apologetic','ashamed','chagrined','compunction','contrite','flustered','foolish','guilty','humbled','humored','inferior','inhibited','mortified','pathetic','regretful','repentant','shame','self-conscious','sorry','submissive','useless','weak','worthless','energized','alert','alive','animated','aroused','bouncy','curious','fanatical','fascinated','feisty','fervor','gung-ho','gusto','hyper','intense','psyched','pumped','snappy','sprightly','thirst','titillated','vindicated','zeal','zest','grateful','blessed','fortunate','gratified','relish','savor','thankful','touched','helpless','awkward','baffled','challenged','clueless','complacent','disturbed','exhausted','fatigued','fragile','impotent','incapable','needy','overwhelmed','pathetic','perplexed','powerless','resigned','sensitive','trapped','victim','hopeful','anticipation','craving','desiring','eager','encouraged','expectant','hankering','optimistic','trusting','hurt','agony','betrayed','humiliated','pained','stung','suffering','suffocated','tormented','tortured','traumatized','insecure','bashful','befuddled','bewildered','cynical','confused','doubtful','possessive','shy','woozy','introspective','absorbed','brooding','contemplative','engrossed','enlightened','inspired','interested','meditative','nostalgic','pensive','reflective','solemn','stirred','wonder','joyful','amused','awed','bemused','bliss','blithe','bonhomie','bubbly','buoyant','carefree','cheerful','delectation','delighted','delirious','ebullient','ecstatic','elated','enchanted','enjoyment','entertained','enthusiastic','euphoric','excited','exhilarated','exuberant','felicitous','genial','giddy','glad','gleeful','goofy','happy','humorous','invigorated','jocular','jocund','jolly','jovial','jubilant','liberated','lighthearted','lively','lucky','merry','mirthful','mischievous','motivated','passionate','perky','playful','pleasure','positive','proud','rapture','reassured','relieved','sanguine','satisfied','silly','sunny','thrilled','triumphant','upbeat','vibrant','kind','caring','compassionate','cordial','earnest','empathetic','pitying','self-loving','sincere','sympathetic','succor','tender','thoughtful','vulnerable','warm','welcoming','loving','accepting','admiring','adoring','adulation','affectionate','ardor','attached','attracted','captivated','devoted','enthralled','felicitous','fondness','fulfilled','infatuated','intimate','intoxicated','present','protective','safe','sensual','warm','worthy','peaceful','accepting','calm','centered','collected','comforted','composed','content','ease','free','fulfilled','mellow','mollified','open','pacified','patient','phlegmatic','present','receptive','relaxed','secure','settled','sure','trusting','tranquil','sadness','aching','alienated','angst','anguish','blue','choked','crestfallen','crummy','crushed','defeated','dejected','depressed','despair','despondent','devastated','disappointed','discouraged','dismal','doleful','down','downcast','excluded','forlorn','gloomy','grief','heartbroken','homesick','hopeless','hurt','lonely','longing','melancholy','mournful','pained','pessimistic','remorseful','sick','somber','sorrowful','teary','troubled','unhappy','upset','weary','wistful','woe','wretched','yearning','surprised','amazed','astonished','astounded','breathless','disbelief','dubious','dumbfounded','flabbergasted','floored','quizzical','scandalized','serendipitous','shock','speechless','stunned','stupefied','unkind','crafty','cruel','derisive','greedy','petty','selfish','smug'];



function EmoCloud () {
    const [emoArr, setEmoArr] = useState([]);
    
    useEffect(() => {
        async function getEmotions() {
            const res = await ECApi.getEmotions(20);
            const reducedEmos = res.emotions.map(obj => ({
                value: obj.emotion,
                count: Math.floor(Math.random() * 20) + 20
            }))
            setEmoArr([reducedEmos]);
        }
        getEmotions();
    }, [])
    console.log(emoArr);
    //call the api to get emotions
    //



    const emoData = emoArr.map(emo =>({
        value: emo,
        count: Math.floor(Math.random() * 20) + 20 
    }));



    const customRender = (tag, size, color) => (
        <span
        key={tag.value}
        style={{
            margin: '4px',
            display: 'inline-block',
            transform: `rotate(${Math.floor(Math.random() * 90) - 45}deg)`,
            fontSize: `${tag.count + size}px`,
            color: `${color}`
        }}
        >
            {tag.value}
        </span>
    )

    function emoClick(tag, event) {
        console.log(tag, event.target)
    }


    return (
        <div>
  
            
            {/* <WordCloud data={emoData} fontsizeMapper={fontsizeMapper} rotate={rotate} padding={3}/> */}
            {/* <WordCloud data={emos} fontsizeMapper={fontsizeMapper} width={screenWidth} height={screenHeight} /> */}
            {/* <WordCloud data={emos} width={screenWidth} height={screenHeight} /> */}
            <TagCloud tags={emoArr} maxSize={40} minSize={20} renderer={customRender} onClick={emoClick}/>
        
        </div>
        )

}

export default EmoCloud;


