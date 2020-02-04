import React, { Component } from 'react';

import './item-details.css';

import ErrorButton from "../error-button/error-button";
import Spinner from '../spinner';

const Record = ({ item, field, label }) => {
    return (
        <li className="list-group-item">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    );
};

export {
    Record,
};

export default class ItemDetails extends Component {

    state = {
        item: null,
        imageUrl: null,
        loading: true
    };

    componentDidMount() {
        this.updateItem();
    };

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId ||
            this.props.getData !== prevProps.getData ||
            this.props.getImageUrl !== prevProps.getImageUrl) {
            this.updateItem();
        };
    };

    updateItem = () => {
        const { itemId, getData, getImageUrl } = this.props;
        if (!itemId) {
            return
        };

        this.setState({
            loading: true
        });

        getData(itemId)
            .then((item) => {
                this.setState({
                    item,
                    imageUrl: getImageUrl(item),
                    loading: false
                });
            });
    };

    render() {

        const { item, imageUrl, loading } = this.state;

        if (!item) {
            return <span>Selected a item from a list</span>
        };

        const content = loading
            ? <Spinner />
            : <ItemView
                item={item}
                imageUrl={imageUrl}
                children={
                    React.Children.map(this.props.children,
                        (child) => {
                            return React.cloneElement(child, { item });
                        })
                } />;

        return (
            <div className="item-details card">
                {content}
            </div>
        );
    };
};

const ItemView = ({ item, imageUrl, children }) => {

    const { name } = item;

    return (
        <React.Fragment>
            <img className="item-image" alt="item"
                src={imageUrl} />
            <div className="card-body">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {children}
                </ul>
                <ErrorButton />
            </div>
        </React.Fragment>
    );
};
