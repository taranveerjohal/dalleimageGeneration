import React, {useState, useEffect} from 'react'
import {Loader, Card, FormField} from '../components'

const Home = () => {

  const RenderCards = ({data, title}) => {
    if(data?.length > 0) {
      return data.map((post) => (
        <Card key={post._id} {...post}/>
      ))
    }
    return (
      <div className='flex justify-center items-center'>
        <h2 className='text-purple-500 text-[16px] font-medium uppercase'>
          {title} 
        </h2>
      </div>
    )
  }

  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useState(null)
  const [searchText, setSearchText] = useState('')
  const [searchedResults, setsearchedResults] = useState(null)
  const [searchTimeout, setSearchTimeout] = useState(null)

  useEffect(() => {
    const  fetchPosts = async () => {
      setLoading(true)
      try {
        const response = await fetch('http://localhost:3000/api/v1/posts',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        if(response.ok)
        {
          const result = await response.json()
          setPosts(result.data.reverse())
        }

        alert(error)
      }
      finally{
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])
    
  const handleSearch = (e) => {
    setSearchText(e.target.value)
    if(searchTimeout) {
      clearTimeout(searchTimeout)
    }
    setSearchTimeout(setTimeout(() => {
      const results = posts.filter((post) => post.prompt.toLowerCase().includes(e.target.value.toLowerCase()) 
      || post.name.toLowerCase().includes(e.target.value.toLowerCase()))
      setsearchedResults(results)
    }, 500))
  }

  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className='font-extrabold text-black text-[32px]'>
          The ShowCase
        </h1>
        <p className='mt-2 text-gray-600 font-semibold text-[20px]'>
          A place to share DALL-E generated images by you and your vivid imagination , ofcourse with the help of AI 😎.
        </p>
        <p className='mt-2 text-gray-500 text-[16px] font-semibold'>
          Feel free to download your creations and share them with the world. <br />
          You can also search for other people's creations based on their name or the prompt they used.
        </p>
      </div>
      <div className='mt-8 text-bold text-[32px] text-purple-500'>
        <FormField
        value={searchText}
        handleChange={handleSearch}
        type='text'
        placeholder='Search based on your Name or Prompt 🚀'
        label='Search Collections 💥' />
      </div>
      <div className='mt-8'>
        {loading ? (
          <div className='flex justify-center items-center'>
            <Loader />
          </div>)
           : 
           <div>
              {searchText && <h2 className='text-gray-500 text-[16px] font-medium mb-4'>
                Showing results for: <span className='text-black'>{searchText}</span>
                </h2>}
              <div className='grid lg:grid-cols-4 xs:grid-cols-2 sm:grid-cols-3 grid-cols-1 gap-3'>
                  {searchText ? <RenderCards data={searchedResults} title='No Search Results Found' /> : <RenderCards data={posts} title='no Posts Found' />}
              </div>
            </div> 
          }
      </div>
    </section>
  )
}

export default Home