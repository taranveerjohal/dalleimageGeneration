import React from 'react'
import { useNavigate } from 'react-router-dom'
import { preview } from '../assets'
import { Loader, FormField } from '../components'
import { GetRandomPrompt } from '../utilities'

const CreatePost = () => {

  const navigate = useNavigate()
  const [form, setForm] = React.useState({ name: '', prompt: '', image: '' })
  const [loading, setLoading] = React.useState(false)
  const [generatingImage, setGeneratingImage] = React.useState(false)

  const submitForm = (e) => {
    e.preventDefault()
    if(form.prompt.length > 0 && form.image){
      setLoading(true)
      fetch('https://dalle-me01.onrender.com/api/v1/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          navigate('/')
        })
        .catch(err => {
          console.log(err)
          setLoading(false)
        })
        .finally(() => {
          setLoading(false)
        })
    }else{
      alert('Please enter a prompt and generate an image')
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSurpriseMe = () => {
    setGeneratingImage(true)
    const prompt = GetRandomPrompt()
      if(prompt) {
        setForm({ ...form, prompt })
        setGeneratingImage(false)
      }
      else{
        setGeneratingImage(false)
      }
  }

  const generateImage = () => {
    if(form.prompt.length > 0 && form.name.length > 0){
      setGeneratingImage(true)
      fetch('http://localhost:3000/api/v1/dalles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: form.prompt })
      })
        .then(res => res.json())
        .then(data => {
          setForm({ ...form, image: `data:image/jpeg;base64,${data.photo}` })
          setGeneratingImage(false)
          setLoading(false)
        })
        .catch(err => {
          console.log(err)
          setGeneratingImage(false)
          setLoading(false)
        })
        .finally(() => {
          setGeneratingImage(false)
          setLoading(false)
        })

    }
    else{
      alert('Please enter a prompt and your name')
    }
  }

  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className='font-extrabold text-black text-[32px]'>
          Create Post
        </h1>
        <p className='mt-2 text-gray-500 font-semibold text-[20px]'>
          Let your imagination flow and create a post for the community by turning your memories into art with just one click
        </p>
        <p className='mt-2 text-gray-600 font-semibold text-[16px]'>
          You can also surprise yourself by clicking on the <span className='underline '>Surprise Me</span> button
        </p>
        <p className='mt-2 text-gray-500 text-[15px]'>
          <span className='text-black'>Note:</span> The images are generated using the DALL-E model. <br />
          The model is trained on the OpenAI dataset. <br />
          Give it a break and don't spam the API 😋 <br />
        </p>
      </div>
      <form onSubmit={submitForm} >
        <div className='mt-8'>
          <FormField
            label='Your Name'
            type='text'
            placeholder='John Doe 👨‍🦱 / Jane Doe 👩' 
            name='name'
            value={form.name}
            handleChange={handleChange}
           />
          </div>
         <div className='mt-8'>
          <FormField
            label='Prompt'
            type='text'
            placeholder='a bowl of soup that looks like a monster, knitted out of wool' 
            name='prompt'
            value={form.prompt}
            handleChange={handleChange}
            isSurpsriseMe ={handleSurpriseMe}
          />
          <div className='relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#6469ff] w-80 p-3
            h-100 flex justify-center items-center mt-3 '>
              { form.image ? (
                <img src={form.image} alt='preview' className='w-full h-full object-contain' />
                ) : (
                  <div className='flex flex-col justify-center items-center'>
                  <img src={preview} alt='preview' className='w-9/12 h-9/12 object-contain opacity-40' />
                  <p className='text-gray-500'>Preview</p>
                </div>
              )}
              {generatingImage && 
                <div className='absolute top-0 left-0 inset-0 z-0 w-full h-full bg-gray-50 bg-opacity-80 flex justify-center items-center'>
                  <Loader />
                </div>
              }
          </div>
        </div>
        <div className='mt-8 flex gap-5'>
          <button
            type='button'
            onClick={generateImage}
            className='bg-green-700 text-white sm:w-auto w-full text-sm font-semibold px-5 py-2 rounded-md hover:bg-green-600'
          >
            {generatingImage? 'Generating...' : 'Generate Image'}
          </button>
        </div>
        <div className='mt-3'>
          <p className='mt-2 text-[#666e75] font-semibold text-[16px]'>
            Once you have generated an image and are happy with it 😍, you can submit it to the community 😎.
          </p>
          <button
            type='submit'
            className='mt-3 bg-[#6469ff] text-white rounded-md  sm:w-auto w-full text-sm font-semibold px-5 py-2 hover:bg-[#4e54c8]'
          >{loading ? "Sharing...": "Share with the community"}</button>
        </div>
      </form>
    </section>
  )
}

export default CreatePost