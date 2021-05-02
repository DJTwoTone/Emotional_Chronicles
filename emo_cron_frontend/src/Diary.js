/**
 * This is the dairy entry form.
 * 
 * It has a few parts.
 * 
 * There is a work cloud that displays a group of random emotions for the user to select
 * Next, there is a writing prompt, user have the ability to change the prompt if they are given one they don't like.
 * Then, we have the main writing area.
 * Finally, there is an inspirational quote for the user, they user is able to change the quote as well as share a quote if they wish.
 * 
 * 
 */

 import React, { useContext, useState, useEffect } from 'react';
 import { useHistory } from 'react-router-dom';
 import { DateTime } from 'luxon'
 
 import FeelingsCloud from './FeelingsCloud';
 import WritingPrompt from './WritingPrompt';
 import WritingInspiration from './WritingInspiration'
 
 import Container from 'react-bootstrap/Container';
 import Form from 'react-bootstrap/Form';
 import Button from 'react-bootstrap/Button';
 
 import ECApi from './ECApi';
 import UserContext from './UserContext';
 
 import './Diary.css';
 
 function Diary () {
 
     const history = useHistory()
     const [entry, setEntry] = useState("");
     const [prompt, setPrompt] = useState({});
     const [inspiration, setInspiration] = useState("");
     const [errors, setErrors] = useState("");
 
     const { loggedInUser, todaysEntry, setTodaysEntry } = useContext(UserContext);
 
     const [feelings, setFeelings] = useState([]);
 
     async function getPrompt() {
         const gottenPrompt = await ECApi.getPrompt();
         setPrompt(gottenPrompt[0])
     }
 
     useEffect(() => {
         async function initialPrompt() {
             try {
                 const p = await ECApi.getPrompt();
                 setPrompt(p[0])
             } catch (err) {
                 setErrors(err)
                 console.error(err);
             }
         }
         initialPrompt();
     }, [])
 
     async function getInspiration() {
         const gottenInspiration = await ECApi.getInspiration();
         setInspiration(gottenInspiration[0])
     }
 
     useEffect(() => {
         async function initialInspiration() {
             try {
                 const insp = await ECApi.getInspiration();
                 setInspiration(insp[0])
             } catch (err) {
                 setErrors(err)
                 console.error(err);
             }
         }
         initialInspiration();
     }, [])
 
 
     function handleChange(evt) {
         setEntry(evt.target.value);
     }
 
     async function handleSubmit(evt) {
         evt.preventDefault();
         
         let data = {
             diaryentry: entry,
             emotions: feelings,
             'prompt_id': prompt.id,
             'inspiration_id': inspiration.id
 
         }
         const username = loggedInUser.username
 
         try {
             
             let entry = await ECApi.addEntry(username, data);
             let entryDate = DateTime.fromISO(entry.entry.date).toISODate()
 
             setTodaysEntry(true);
             history.push(`/entry/${username}/${entryDate}`)
             
 
         } catch (err) {
             setErrors(err)
             console.error(err);
         }
     }
 
     if (todaysEntry) {
         history.push('/calendar')
     }
 
 
     return (
 
         <Container fluid className='justify-content-center my-5'>
         <FeelingsCloud className='m-4' feelings={feelings} setFeelings={setFeelings} />
         <WritingPrompt prompt={prompt} getPrompt={getPrompt} />
         {errors
         ? <h2 class="text-warning">{errors}</h2>
         : null
         }
         <Form className='m-4 shadow' onSubmit={handleSubmit}>
             <Form.Group controlId='diaryEntry'>
                 <div  id='pattern'>
                 <Form.Control 
                       as='textarea'
                       type='text'
                       name='diaryEntry'
                       value={entry}
                       onChange={handleChange}
                       rows={20}
                 />
 
                 </div>
 
             </Form.Group>
             
             <Button
                 className='mb-4'
                 variant='dark'
                 type='submit'
                 onClick={handleSubmit}
             >
                 RECORD
             </Button>
         </Form>
         <WritingInspiration 
             className='m-4 shadow' 
             inspiration={inspiration}
              getInspiration={getInspiration} />
     </Container>
         
     )
 
 
 
 
 }
 
 
 export default Diary;