const Newsletter = () => {
  return (
      <div className="w-full h-auto px-5 py-5 bg-wh flex  justify-center">
          <div className="w-full lg:w-[90%] bg-black rounded-4xl flex lg:flex-row flex-col justify-between items-center py-10 lg:py-0">
              <div className="w-full lg:w-[60%] font-accent uppercase font-bold lg:text-5xl text-3xl text-wh py-5 px-10 h-40 lg:h-48 flex items-center">
                  Stay uptodate to our latest stock
              </div>
              <div className="w-full lg:w-[40%]  text-wh py-5 px-10 flex flex-col justify-center items-center gap-3">
                  <input type="email" className="btn-primary bg-wh text-black outline-none w-full lg:w-[80%]" placeholder="yormail@provider.com" />
                  <button className="btn-primary bg-wh text-black w-full lg:w-[80%]">Subscribe</button>
              </div>
          </div>
      </div>
  )
}

export default Newsletter