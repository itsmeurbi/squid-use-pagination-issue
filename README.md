# Purpose

This repository is meant to be used only as a playground to replicate and test whay I believe is an unexpected behaviour using the `usePagination` hook from `@squidcloud/react` lib

## Assumptions

This repository assums you have a [Squid](https://squid.cloud) project with a proper MongoDB integration with at least one collection

## Setup

- Make sure you have installed all the required packages with `yarn install`
- Once all packages are installed, go to `src/index.js` and replace `appId` and `region` props with your Squid application id and its region
- Go to `src/App.js` and addecuate the `useCollection` hook to use your Squid integration name for MongoDB and the collection name. As it is, it'll look for a `users` collection in a `test` integration
- Finally run `yarn start` and open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Issue description

### System use case

We want to paginate and sort a collection of records based off their `name` attribute. Just that
This `name` attribute may have the followign format `[identifier] - description`; this is important for understanding the issue


### Issue

We're usign Squid to retrieve the data from MongoDB, so while playing around with `usePagination` hook, I found what I think is an unexpected behavior.
`usePagination` seems to have issues paginating records with "special" characters, like `[]`
The data returned by this hook changes based off `subscribe` and `pageSize` options values. Defining a `pageSize: 5`, if you use `subscribe: true` hook returns records starting with `[`, while using `subscribe: false` completly ignores records that starts with `[`
Now, if you change the pagination for a number bigger than 5, it returns the missing records but pagination breaks. Requesting the next batch of data keeps returning the same set of data, making imposible to navigate a to a next page

This exercise is working with a data set of 17 documents on MongoDB, each one with an `_id` and `name` attribute, only two of those recrods containing `[` in `name`


### Evidences:
The following video serves as an evidence for the described issue
Please see how data changes as soon as the `subscribe` value changes from `true` to `false`. Also pagination breaks when `pageSize` receives a value bigger than 5
[![Video](https://youtu.be/nPBtnlFceC4)](https://youtu.be/nPBtnlFceC4)

https://youtu.be/nPBtnlFceC4
