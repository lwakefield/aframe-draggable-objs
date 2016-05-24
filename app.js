AFRAME.registerComponent('draggable', {
    init() {
        this.mouse = new THREE.Vector2();
        this.scene = this.el.sceneEl;
        this.camera = this.scene.camera;

        document.addEventListener('mousemove', e => {
            this.mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
            this.mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;

            if (this.selected) {
                let r = new THREE.Raycaster();
                r.setFromCamera(this.mouse, this.camera);
                let point = r.ray.direction.multiplyScalar(5);
                this.el.setAttribute('position', `${point.x} ${point.y} ${point.z}`);
            }
        });

        document.addEventListener('mousedown', e => {
            let r = new THREE.Raycaster();
            r.setFromCamera( this.mouse, this.camera );
            let intersected = r.intersectObject( this.el.object3D, true );
            if (intersected.length) this.selected = true;
        });

        document.addEventListener('mouseup', e => {
            this.selected = undefined;
        });
    }
});
