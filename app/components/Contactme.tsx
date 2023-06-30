
export const Contactme = () => {
  return (
    <div className='flex items-center justify-between snap-center h-[100vh]'>

      <form action="" className="flex flex-col gap-4">
        <h1 className="text-white"> Contact me</h1>
        <input  className="bg-[#e8e8e6] " type="text" />
        <textarea className="bg-[#e8e8e6] p-4" name="" id="" cols="30" rows="10"></textarea>
        <input className="bg-[#e8e8e6] " type="text" />
        <button className="bg-[yellow]"> Send</button>
      </form>
      <div>
        map
      </div>
    </div>
  )
}
