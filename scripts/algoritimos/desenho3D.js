import * as THREE from "../tree/three.module.js"

export function Cubo(canvas) {
    // Cria a cena a ser renderizada
    const scene = new THREE.Scene();

    // Cria a perspectiva de visualização 3D
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(scene.position); // Aponta a câmera para onde foi definida a cena 

    // Cria o renderizador
    const renderer = new THREE.WebGLRenderer({ canvas: canvas });
    renderer.setClearColor(0xFFFFFF, 1); // 1 significa pintar em sua totalidade
    renderer.setSize(canvas.clientWidth, canvas.clientHeight); // Define o tamanho da área de renderização de acordo com o tamanho do canvas

    // Cria a geometria básica do cubo
    const boxGeometry = new THREE.BoxGeometry(2, 2, 2);
    
    // Cria a geometria de arestas do cubo
    const edgesGeometry = new THREE.EdgesGeometry(boxGeometry);

    // Cria o material e o wireframe do cubo
    const material = new THREE.LineBasicMaterial({ color: 0x000000 });
    const wireframe = new THREE.LineSegments(edgesGeometry, material);
    scene.add(wireframe);

    // Adiciona eixos cartesianos
    let eixosCartezianos = new THREE.AxesHelper(15);
    scene.add(eixosCartezianos);

    // Renderiza a cena
    renderer.render(scene, camera);
}


//função de desenho da casa
export function Casa(canvas) {
    // Cena
    const scene = new THREE.Scene();

    // Configurar a câmera usando o tamanho do canvas
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    // Renderizador
    const renderer = new THREE.WebGLRenderer({ canvas: canvas });
    renderer.setSize(width, height);

    // Corpo da casa (Cubo)
    const geometryHouse = new THREE.BoxGeometry(1, 1, 1);
    const materialHouse = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const house = new THREE.Mesh(geometryHouse, materialHouse);
    scene.add(house);

    // Telhado da casa (Prisma Triangular) usando BufferGeometry
    const roofVertices = new Float32Array([
        -0.5, 0.5, 0.5,  // 0: Bottom left front
         0.5, 0.5, 0.5,  // 1: Bottom right front
         0.0, 1.0, 0.5,  // 2: Top middle front
        -0.5, 0.5, -0.5, // 3: Bottom left back
         0.5, 0.5, -0.5, // 4: Bottom right back
         0.0, 1.0, -0.5  // 5: Top middle back
    ]);

    const roofIndices = [
        0, 1, 2, // Front face
        1, 4, 2, 4, 5, 2, // Right face
        3, 5, 4, // Back face
        0, 3, 5, 0, 5, 2 // Left face
    ];

    const roofGeometry = new THREE.BufferGeometry();
    roofGeometry.setAttribute('position', new THREE.BufferAttribute(roofVertices, 3));
    roofGeometry.setIndex(roofIndices);
    roofGeometry.computeVertexNormals();

    const roofMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide });
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.y = 0;
    scene.add(roof);

    renderer.render(scene, camera);

}
