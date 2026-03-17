function AICalling(){

return(

<div className="bg-black text-white p-6 rounded-xl border border-purple-500">

<h2 className="text-xl mb-4 text-purple-400">
AI Calling Campaign
</h2>

<div className="flex gap-4">

<button className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700">
Start Campaign
</button>

<button className="bg-gray-900 px-4 py-2 rounded border border-purple-500">
Stop Campaign
</button>

</div>

<p className="mt-4 text-gray-400">
AI will automatically call uploaded leads and update CRM status.
</p>

</div>

);

}

export default AICalling;