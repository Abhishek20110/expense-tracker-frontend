(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[297],{66320:(e,a,t)=>{Promise.resolve().then(t.bind(t,54702))},54702:(e,a,t)=>{"use strict";t.r(a),t.d(a,{default:()=>n});var s=t(95155),l=t(12115),r=t(82651);let n=()=>{let[e,a]=(0,l.useState)(""),[t,n]=(0,l.useState)(""),[d,c]=(0,l.useState)(""),[i,o]=(0,l.useState)(null),[u,m]=(0,l.useState)(null),x=async s=>{s.preventDefault();try{let s=await r.A.post("".concat("http://localhost:8080","/api/contact"),{name:e,email:t,message:d});200===s.status&&(o("Your message has been sent successfully!"),a(""),n(""),c(""))}catch(e){console.error(e),m("Failed to send your message. Please try again.")}};return(0,s.jsxs)("div",{className:"relative w-full px-6 py-10 bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-100 rounded-xl shadow-lg mx-auto",children:[(0,s.jsx)("h1",{className:"text-4xl font-bold text-center mb-8 text-gray-800",children:"Contact Us"}),i&&(0,s.jsx)("div",{className:"text-green-600 text-center mb-4",children:i}),u&&(0,s.jsx)("div",{className:"text-red-600 text-center mb-4",children:u}),(0,s.jsxs)("form",{onSubmit:x,className:"space-y-6",children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{htmlFor:"name",className:"block text-gray-700 mb-2",children:"Name"}),(0,s.jsx)("input",{type:"text",id:"name",value:e,onChange:e=>a(e.target.value),className:"w-full px-4 py-2 border border-gray-300 rounded",required:!0})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{htmlFor:"email",className:"block text-gray-700 mb-2",children:"Email"}),(0,s.jsx)("input",{type:"email",id:"email",value:t,onChange:e=>n(e.target.value),className:"w-full px-4 py-2 border border-gray-300 rounded",required:!0})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{htmlFor:"message",className:"block text-gray-700 mb-2",children:"Message"}),(0,s.jsx)("textarea",{id:"message",value:d,onChange:e=>c(e.target.value),rows:6,className:"w-full px-4 py-2 border border-gray-300 rounded",required:!0})]}),(0,s.jsx)("div",{className:"text-center",children:(0,s.jsx)("button",{type:"submit",className:"px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600",children:"Send Message"})})]})]})}}},e=>{var a=a=>e(e.s=a);e.O(0,[651,441,517,358],()=>a(66320)),_N_E=e.O()}]);