// Getting Canvas
var c = document.getElementById("mycanvas");
var ctx = c.getContext("2d");

// Function for load Image
let loadImage = (src, callback) => {
    let img = document.createElement("img");
    img.onload = () => callback(img);
    img.src = src;
};

//Gets Image Path
let imagePath = (frameNumber,aniamtion) => {
    return "images/" + aniamtion + "/"+ frameNumber + ".png";
};

let frames = {
    idle:[1,2,3,4,5,6,7,8],
    kick:[1,2,3,4,5,6,7],
    punch:[1,2,3,4,5,6,7],
    forward:[1,2,3,4,5,6],
    backward:[1,2,3,4,5,6],
    block:[1,2,3,4,5,6,7,8,9],
};

let loadImages = (callback) => {

    let images = {idle:[],kick:[],punch:[],forward:[],backward:[],block:[]};
    let imagesToLoad = 0;
    ["idle","kick","punch","forward","backward","block"].forEach(animation => {
        let animationFrames = frames[animation];

        imagesToLoad = imagesToLoad + animationFrames.length;

        animationFrames.forEach((frameNumber) => {

            let path = imagePath(frameNumber, animation);

            loadImage(path, (image) => {
                images[animation][frameNumber - 1] = image;
                imagesToLoad = imagesToLoad - 1;
    
                if(imagesToLoad == 0)
                {
                    callback(images);
                }
    
            });
        });
        })
};

let x = 10;

let animate = (ctx, images, animation, callback) => {
    images[animation].forEach((image,index) => {
        setTimeout(() => {
            ctx.clearRect(0,0,1000,500);
            var background = new Image();
            background.src = "images/background.jpg";
            ctx.drawImage(background,0,0,1000,500);    
            if(animation=="forward" && x <= 570)
                x += 15;
            else if(animation=="backward" && x > 10)
                x -= 15;
            ctx.drawImage(image,x,85,400,400);
        }, index * 100);
    });
    setTimeout(callback,images[animation].length *100);
};

loadImages((images) => {
    let q = [];
    let aux = () => {
        let selectedanimation;
        if(q.length === 0) selectedanimation = "idle";
        else selectedanimation = q.shift();
        animate(ctx,images,selectedanimation,aux);
    };

    aux();

    document.getElementById("kick").onclick = () => {
        q.push("kick");
    };
    document.getElementById("punch").onclick = () => {
        q.push("punch");
    };
    document.getElementById("forward").onclick = () => {
        q.push("forward");
    };
    document.getElementById("backward").onclick = () => {
        q.push("backward");
    };
    document.getElementById("block").onclick = () => {
        q.push("block");
    };

    document.addEventListener("keyup", (event) => {
        const key = event.key;
        if(key  == "ArrowDown")
            q.push("kick");
        else if(key == "ArrowUp")
            q.push("punch");
        else if(key == "ArrowRight")
            q.push("forward");
        else if(key == "ArrowLeft")
            q.push("backward");
        else if(key == "Enter")
            q.push("block");
    })
});