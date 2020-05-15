function init(){
    //create the scene 
    var scene = new THREE .Scene();
    //create new variable gui
    var gui = new dat.GUI();

    //disable fog
    var enableFog = false;

    if (enableFog){
        //create a fog 
        scene.fog = new THREE.FogExp2(0xffffff, 0.2) ;
    }
     
    // call the function getPointLight
     
    
    // call the function getBox()    
     var box = getBox(1, 1,1);

     // call the function pointLight()
     var pointLight = getPointLight(1);

     // call the function sphere()
     var sphere = getSphere(0.05);

    // call the function getPlane
    var plane  = getPlane(20);
    plane.name = 'plane-01';
    
    //position the box to his bottom height
    box.position.y = box.geometry.parameters.height/2;
    
    // rotate the x axis of the plane
    plane.rotation.x= Math.PI/2;   
    // set pointLight() position and intensity
    pointLight.position.y= 2; 
    pointLight.intensity= 2;

   gui.add(pointLight, 'intensity', 0, 10 );
   gui.add(pointLight.position, 'y', 0, 5);
    

    // adding to the scene.
    scene.add(box);   
    scene.add(plane);
    pointLight.add(sphere);
    scene.add(pointLight);
    
    
    // Create the camera 
    var camera = new THREE.PerspectiveCamera(
        45, 
        window.innerWidth/window.innerHeight, 
        1, 
        1000
        );
   
    //position the camera values (x,y,z).
    camera.position.x = 1;
    camera.position.y = 2;
    camera.position.z = 5;

    // lookAt give the objets the 3d view
    camera.lookAt(new THREE.Vector3(0,0,0));

    // create the renderer variable
    var renderer = new THREE.WebGLRenderer();

    // set renderer shadow
    renderer.shadowMap.enabled = true;
    //set the size of the rendderer
    renderer.setSize(window.innerWidth, window.innerHeight);

    //set the background color
    renderer.setClearColor('#800000');
    
    //call the div'webgl'
    document.getElementById('webgl').appendChild(renderer.domElement);
    
    var controls =  new THREE.OrbitControls(camera, renderer.domElement);

    // call the update to renderer the scene.
    update( renderer, scene, camera, controls);
    return scene;
    
}
//create the  scene - to the init() function
var scene = init();

// create object with green color
function getBox(w, h, d){
    
    var geometry = new THREE.BoxGeometry(w, h, d);    
    var material = new THREE.MeshPhongMaterial({
        color:  'rgb(120, 120 ,120)'
    });
    var mesh = new THREE.Mesh(
        geometry,
        material
    );
    mesh.castShadow = true;
    return mesh;
}

// create a light shpere
function getSphere(size){
    
    var geometry = new THREE.SphereGeometry(size, 24, 24);    
    var material = new THREE.MeshBasicMaterial({
        color:  'rgb(200, 250 ,120)'
    });
    var mesh = new THREE.Mesh(
        geometry,
        material
    );
    return mesh;
}
   // create plane with blue color
function getPlane(size){
 
    var geometry = new THREE.PlaneGeometry(size, size);    
    var material = new THREE.MeshPhongMaterial({
        color: 'rgb(120, 120 ,255)',
        side: THREE.DoubleSide
    });
    var mesh = new THREE.Mesh(
        geometry,
        material
    );
    mesh.receiveShadow = true;
    return mesh;
}

// create a getPointLight function
function getPointLight(intensity){
    var light = new THREE.PointLight(0xfffffff, intensity);
    light.castShadow= true;
    return light;
}

// create update function to renderer the scene
function update(renderer, scene, camera, controls){
    renderer.render(
        scene,
        camera,
        
    );
    //call controls to activate orbitControls
        controls.update();

    // create this function to recursively called the given function update.
    requestAnimationFrame(function() {
        update(renderer, scene,  camera, controls);
    })
}
//init();
