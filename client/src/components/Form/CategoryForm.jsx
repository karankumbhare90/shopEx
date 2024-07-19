import React from 'react'
import './CategoryForm.css'

const CategoryForm = ({ handleSubmit, value, setValue }) => {

    return (
        <>
            <form className='forms' onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="form-control"
                    placeholder='Enter New Category'
                    value={value}
                    onChange={(e) => { setValue(e.target.value) }}
                />
                <button type="submit" className="btn btnss btn-primary">Submit</button>
            </form>
        </>
    )
}

export default CategoryForm