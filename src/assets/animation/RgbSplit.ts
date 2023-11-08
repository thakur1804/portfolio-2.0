/* eslint-disable @typescript-eslint/no-explicit-any */
import * as THREE from "three";
import vertexShader from "../shaders/RgbSplitVS.glsl?raw";
import fragmentShader from "../shaders/RgbSplitFS.glsl?raw";


let current = 0;
let target = 0;
const ease = 0.045;

function lerp(start: number, end: number, t: number): number {
  return start * (1 - t) + end * t;
}

function init(scrollable: any): void {
  if (scrollable) {
    document.body.style.height = `${
      scrollable.getBoundingClientRect().height
    }px`;
  }
}

function smoothScroll(scrollable: any): void {
  target = window.scrollY;
  current = lerp(current, target, ease);
  if (scrollable) {
    scrollable.style.transform = `translate3d(100px, ${current}px, 50px)`;
  }
}

export default class EffectCanvas {
  private container: HTMLDivElement;
  private images: HTMLImageElement;
  private meshItems: MeshItem[] = [];
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;

  constructor(container: HTMLDivElement, images: HTMLImageElement) {
    this.container = container;
    this.images = images;
    init(this.container);
    this.setupCamera();
    this.createMeshItems();
    this.render();
  }

  get viewport(): { width: number; height: number; aspectRatio: number } {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const aspectRatio = width / height;
    return {
      width,
      height,
      aspectRatio,
    };
  }

  setupCamera(): void {
    window.addEventListener("resize", this.onWindowResize.bind(this), false);

    this.scene = new THREE.Scene();

    const perspective = 1000;
    const fov =
      (180 * (2 * Math.atan(window.innerHeight / 2 / perspective))) / Math.PI;
    this.camera = new THREE.PerspectiveCamera(
      fov,
      this.viewport.aspectRatio,
      1,
      1000
    );
    this.camera.position.set(0, 0, perspective);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(this.viewport.width, this.viewport.height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    if (this.container) {
      this.container.appendChild(this.renderer.domElement);
    }
  }

  onWindowResize(): void {
    init(this.container);
    this.camera.aspect = this.viewport.aspectRatio;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.viewport.width, this.viewport.height);
  }

  createMeshItems(): void {
    // this.images.forEach((image) => {
      const meshItem = new MeshItem(this.images, this.scene);
      this.meshItems.push(meshItem);
    // });
  }

  render(): void {
    smoothScroll(this.container);
    for (let i = 0; i < this.meshItems.length; i++) {
      this.meshItems[i].render();
    }
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.render.bind(this));
  }
}

class MeshItem {
  private element: HTMLImageElement;
  private scene: THREE.Scene;
  private offset: THREE.Vector2 = new THREE.Vector2(0, 0);
  private sizes: THREE.Vector2 = new THREE.Vector2(0, 0);
  private geometry: THREE.PlaneGeometry;
  private imageTexture: THREE.Texture;
  private uniforms: {
    uTexture: { value: THREE.Texture };
    uOffset: { value: THREE.Vector2 };
    uAlpha: { value: number };
  };
  private material: THREE.ShaderMaterial;
  private mesh: THREE.Mesh;

  constructor(element: HTMLImageElement, scene: THREE.Scene) {
    this.element = element;
    this.scene = scene;
    this.createMesh();
  }

  getDimensions(): void {
    if (this.element) {
      const { width, height, top, left } = this.element.getBoundingClientRect();
      this.sizes.set(width, height);
      this.offset.set(
        left - window.innerWidth / 2 + width / 2,
        -top + window.innerHeight / 2 - height / 2
      );
    }
  }

  createMesh(): void {
    this.geometry = new THREE.PlaneGeometry(1, 1, 100, 100);
    this.imageTexture = new THREE.TextureLoader().load(this.element.src);
    this.uniforms = {
      uTexture: { value: this.imageTexture },
      uOffset: { value: new THREE.Vector2(0.0, 0.0) },
      uAlpha: { value: 1 },
    };
    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      transparent: true,
      side: THREE.DoubleSide,
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.getDimensions();
    this.mesh.position.set(this.offset.x, this.offset.y, 0);
    this.mesh.scale.set(this.sizes.x, this.sizes.y, 1);
    this.scene.add(this.mesh);
  }

  render(): void {
    this.getDimensions();
    this.mesh.position.set(this.offset.x, this.offset.y, 0);
    this.uniforms.uOffset.value.set(
      this.offset.x * 0.0,
      -(target - current) * 0.0005
    );
  }
}