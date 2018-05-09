# Mic Product Engineer Development Test

## General Guidelines
This is a developer competency test designed to gauge skill, attention to detail and affinity for standards-based development.

- The code should follow best practices.
- You may use any libraries or frameworks that you want for this task, but prepare to explain your choices in a follow-up interview.
- Project setup files have been ommitted. We want to see how you organize a project.
- Even though this is a small project, treat it as if it were becoming a permanent part of a broader app.
- Your submission should include a readme file with instructions on how to install and get started.

## Implementation Details
1. Populate a page with data from `articles.json`, as demonstrated in the image below. Initially display 10 of the 30 articles.
1. At the bottom of the table should be a "Load More" button (not shown below) that will show 10 more rows. If there are no more articles to show from the bootstrapped data, then make an xhr request to `more-articles.json` and dynamically add them to the table, 10 at a time.
1. Allow the user to sort the table via the `words` and `submitted` columns.
1. If a user leaves the page and then returns, their previous sorting choice should be automatically set. For this one you can ignore having your solution work in non-modern browsers.
1. Your user interface should look better than the screenshot below. Take whatever design liberties you'd like.

[![End Product](https://bitbucket.org/policymic/dev-test/raw/master/screenshot.png)](https://bitbucket.org/policymic/dev-test/raw/master/screenshot.png)

### Submission
Clone this repository, complete the test, make your commits locally and then email a compressed version of the entire code base to <ellell@mic.com> and <marcus@mic.com> (including the hidden .git directory).

Email <ellell@mic.com> and <marcus@mic.com> with any questions you may have.






This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

