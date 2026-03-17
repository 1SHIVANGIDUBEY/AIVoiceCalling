function PipelineBoard(){

const stages = {
New:["Rahul","Aman"],
Contacted:["Riya"],
Interested:["Shivangi"],
Converted:["John"]
};

return(

<div className="grid grid-cols-4 gap-6">

{Object.entries(stages).map(([stage,leads])=>(

<div
key={stage}
className="bg-black text-white p-4 rounded-xl border border-purple-500"
>

<h3 className="mb-4 text-purple-400">
{stage}
</h3>

{leads.map((lead,i)=>(
<div
key={i}
className="bg-gray-900 p-3 mb-2 rounded border border-purple-700"
>
{lead}
</div>
))}

</div>

))}

</div>

);

}

export default PipelineBoard;