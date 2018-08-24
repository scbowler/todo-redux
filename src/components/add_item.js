import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { addItem } from '../actions';

class AddItem extends Component {
    handleAddItem = async values => {
        await this.props.addItem(values);

        this.props.history.push('/');
    }

    renderInput({label, input, meta: {touched, error}}){
        return (
            <div className="row">
                <div className="col s12">
                    <label>{label}</label>
                    <input {...input} type="text" autoComplete="off"/>
                    <p className="red-text text-darken-2">{touched && error}</p>
                </div>
            </div>
        )
    }

    render(){
        const { handleSubmit } = this.props;

        return (
            <div>
                <h1 className="center">Add Item</h1>
                <div className="row">
                    <div className="col s12 right-align">
                        <Link to="/" className="btn blue darken-2">Back To List</Link>
                    </div>
                </div>
                <div className="row">
                    <form onSubmit={handleSubmit(this.handleAddItem)} className="col s12 m8 offset-m2">
                        <Field name="title" teacher="Dan" label="Title" component={this.renderInput}/>
                        <Field name="details" teacher="Cody" label="Details" component={this.renderInput}/>
                        <div className="row">
                            <div className="col s12 right-align">
                                <button className="btn blue lighten-1">Add Item</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

function validate(values){
    const { title, details } = values;
    const errors = {};

    if(!title){
        errors.title = 'Please give your item a title';
    }
    if(!details){
        errors.details = 'Please enter details about your item';
    }

    return errors;
}

AddItem = reduxForm({
    form: 'add-item',
    validate: validate
})(AddItem);

export default connect(null, { addItem: addItem })(AddItem);
