import './App.css';
import { Feedback } from './components/Feedback';

function App() {
  return <Feedback />;
}

export default App;
// import { createBrowserInspector } from '@statelyai/inspect';
// import { RoomScheduler } from './components/roomScheduler';
// import ClassroomScheduler from './components/ClassroomScheduler';
// import { RoomProvider } from './contexts/RoomContext';
// import { sampleClassrooms } from './exampleData/sampleClassrooms';
// import { sampleCourses } from './exampleData/sampleCourses';
// import { sampleInstructors } from './exampleData/sampleInstructors';
// const { inspect } = createBrowserInspector({
  // Comment out the line below to start the inspector
  // autoStart: false
// });

// function App() {
//   return (
//     <div className="app">
//       <h1>Geology Department Scheduler</h1>
//       <RoomProvider>
//         <RoomScheduler />
//       </RoomProvider>
//       {/* {sampleClassrooms.map(classroom => (
//         <ClassroomScheduler
//           key={classroom.id}
//           classroom={classroom}
//           courses={sampleCourses}
//           instructors={sampleInstructors}
//         />
//       ))} */}
//     </div>
//   );
// }

// export default App;// import './App.css';
// import { useMachine } from '@xstate/react';
// import { createBrowserInspector } from '@statelyai/inspect';
// import { feedbackMachine } from './machines/feedbackMachine';

// const { inspect } = createBrowserInspector({
// });

// function Feedback() {
//   const [state, send] = useMachine(feedbackMachine, {
//     inspect
//   });

//   if (state.matches('closed')) {
//     return (
//       <div>
//         <em>Feedback form closed.</em>
//         <br />
//         <button
//           onClick={() => {
//             send({ type: 'restart' });
//           }}
//         >
//           Provide more feedback
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="feedback">
//       <button
//         className="close-button"
//         onClick={() => {
//           send({ type: 'close' });
//         }}
//       >
//         Close
//       </button>
//       {state.matches('prompt') && (
//         <div className="step">
//           <h2>How was your experience?</h2>
//           <button
//             className="button"
//             onClick={() => send({ type: 'feedback.good' })}
//           >
//             Good
//           </button>
//           <button
//             className="button"
//             onClick={() => send({ type: 'feedback.bad' })}
//           >
//             Bad
//           </button>
//         </div>
//       )}

//       {state.matches('thanks') && (
//         <div className="step">
//           <h2>Thanks for your feedback.</h2>
//           {state.context.feedback.length > 0 && (
//             <p>"{state.context.feedback}"</p>
//           )}
//         </div>
//       )}

//       {state.matches('form') && (
//         <form
//           className="step"
//           onSubmit={(ev) => {
//             ev.preventDefault();
//             send({
//               type: 'submit'
//             });
//           }}
//         >
//           <h2>What can we do better?</h2>
//           <textarea
//             name="feedback"
//             rows={4}
//             placeholder="So many things..."
//             onChange={(ev) => {
//               send({
//                 type: 'feedback.update',
//                 value: ev.target.value
//               });
//             }}
//           />
//           <button className="button" disabled={!state.can({ type: 'submit' })}>
//             Submit
//           </button>
//           <button
//             className="button"
//             type="button"
//             onClick={() => {
//               send({ type: 'back' });
//             }}
//           >
//             Back
//           </button>
//         </form>
//       )}
//     </div>
//   );
// }

// function App() {
//   return <Feedback />;
// }

// export default App;
