import * as THREE from "../tree/three.module.js"

export function Cubo(canvas) {
    //cria a cena a ser renderizada
    const scene = new THREE.Scene();

    // cria a pespectiva de visualização 3D
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.set(5,5,5);
    camera.lookAt(scene.position); //aponta a camera para onde foi definido a cena 

    //cria o renderizador
    const renderer = new THREE.WebGLRenderer({ canvas: canvas });
    renderer.setClearColor( 0xFFFFFF, 1); //1 significa pintar em sua totalidade
    renderer.setSize(canvas.clientWidth, canvas.clientHeight); //define o tamanho da area de renderização de acordo com o tamanho do canvas

    //cria o cubo
    const geometry = new THREE.BoxGeometry(2,2,2);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    let eixosCartezianos = new THREE.AxesHelper(15);
    scene.add(eixosCartezianos);

    camera.position.z = 5;

    renderer.render(scene, camera);
    
}
