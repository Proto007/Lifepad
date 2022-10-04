# Lifepad
> **_NOTE:_** There is an issue with CORS while accessing the doc editor in some browsers.

Lifepad was the project for Capstone class during my undergrad years. We had to come up with an idea and make something as a group. Check out the original repo! 
To learn more about lifepad and individual contributions and app features, checkout the presentation:
https://docs.google.com/presentation/d/1YgwH-ZEYtaNXRDQfn0ySE2B3gjZlYJ7b/edit?usp=sharing&ouid=102130102906333056269&rtpof=true&sd=true

# Demo
This demo shows the editor in lifepad.
<img src='https://github.com/Proto007/Lifepad/blob/main/demo.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

# Installation

1. Clone this repository
2. Create a Python virtual environment in the repo:
```
python3 -m venv capstone
```

3. Activate it with `./capstone/bin/activate`
4. For all future steps, cd into django-react
5. Install python dependencies: `pip3 install -r requirements.txt`
6. Change into the frontend folder and install node dependencies: `npm install`
7. You need Node Version Manager to use Node 16:
```
source .bashrc
nvm use 16
```

# Running in Development

**Make sure you pull**, and run database migrations if necessary
```
python3 manage.py migrate
```

1. In django-react/frontend: `npm run dev`
2. In django-react/frontend: `npm run watch:css`
3. Activate python virtual environment. In django-react: `python3 manage.py runserver`
