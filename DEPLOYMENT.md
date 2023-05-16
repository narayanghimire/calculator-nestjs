# Deployment Strategy

## Quick Overview

Hey there! So, I've set up a neat little system using GitHub Actions workflows for this project. The goal? To automate
testing and send the project sailing smoothly onto Google Cloud.

## The Flow of Things

1. **Feature Branch:** When a pull request pops up, it triggers a build of feature branch. We run unit tests here, 
    aiming to get rapid feedback. Speed is key at this stage!

2. **Code Review and Merging:** After the feature branch passes its tests and gets the thumbs up on code review, 
   we merge it with the main branch.

3. **Main Branch Testing and Deployment:** Now, the main branch gets its turn under the spotlight. 
  We run the integration tests here. If all goes well, we pack everything up into a Docker container and ship it off to 
  Google Cloud.

## My Experience with Google Cloud Deployment

This was my first try with Google Cloud, and let me tell you, it's been quite a journey. I managed to deploy the 
container, but hit a bit of a snag: the container port wasn't playing nice with the port defined by Google.
It was a bit of a head-scratcher and, due to my timing, I couldn't quite get to the bottom of it.

But hey, I'm not one to back down from this problem. I'm confident that with a bit more time and a deep dive
into the issue, I can get it sorted out.
Finally, you can find the workflows for these tasks inside the ``.github/workflows`` directory. 
Additionally, you can check the Actions tab of the repository for the GitHub Action builds