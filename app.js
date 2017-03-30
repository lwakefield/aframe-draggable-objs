AFRAME.registerComponent('draggable', {
    init() {
        this.mouse = new THREE.Vector2();
        this.scene = this.el.sceneEl;
        this.camera = this.scene.camera;
        this.obj = this.el.object3D;
        var getYRotation = function ( position ){
          const PI = 22/7;
          var camera = this.camera.object3DMap.camera;    
          return `0 ${(Math.atan2( ( camera.position.x - position.x ), ( camera.position.z - position.z ) ))*180/PI} 0`;
        }

        this.scene.addEventListener('mousemove', e => {
            this.mouse.x = ( e.offsetX / this.scene.canvas.offsetWidth ) * 2 - 1;
            this.mouse.y = - ( e.offsetY / this.scene.canvas.offsetHeight ) * 2 + 1;

            if (this.selected) {
                let r = new THREE.Raycaster();
                r.setFromCamera(this.mouse, this.camera);
                let dist = this.obj.position.distanceTo(this.camera.position);
                let point = r.ray.direction.multiplyScalar(dist);
                this.el.setAttribute('position', `${point.x} ${point.y} ${point.z}`);
                this.el.setAttribute('rotation',getYRotation(point));
            }
        });

        this.scene.addEventListener('mousedown', e => {
            let r = new THREE.Raycaster();
            r.setFromCamera( this.mouse, this.camera );
            let intersected = r.intersectObject( this.el.object3D, true );
            let objPos = this.el.object3D.position;
            let camPos = this.camera.position;
            console.log(objPos.distanceTo(camPos));
            if (intersected.length) this.selected = true;
        });

        this.scene.addEventListener('mouseup', e => {
            this.selected = undefined;
        });
    }
});
