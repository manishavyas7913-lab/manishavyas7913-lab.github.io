/* =========================================================
   KALINDI VYAS PORTFOLIO
   THREE.JS 3D VISUAL EXPERIENCE
   ========================================================= */

(() => {
    "use strict";

    /* ---------------------------------------------------------
       BASIC DEVICE CHECK
    --------------------------------------------------------- */

    const isMobile =
        window.matchMedia("(max-width: 700px)").matches;

    const prefersReducedMotion =
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;


    /* ---------------------------------------------------------
       PAGE DETECTION
    --------------------------------------------------------- */

    const page =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase() || "index.html";


    /* ---------------------------------------------------------
       PAGE DATA
       These labels are used inside the 3D visual system.
    --------------------------------------------------------- */

    const pageData = {

        "index.html": {
            title: "Kalindi Vyas",
            subtitle: "Curious • Confident • Ambitious",
            type: "home"
        },

        "about.html": {
            title: "About Me",
            subtitle: "A curious mind with a passion for learning",
            type: "about"
        },

        "journey.html": {
            title: "My Journey",
            subtitle: "Learning, growing and becoming",
            type: "journey"
        },

        "achievements.html": {
            title: "Achievements",
            subtitle: "Milestones that shaped me",
            type: "achievements"
        },

        "skills.html": {
            title: "My Skills",
            subtitle: "Knowledge, communication and creativity",
            type: "skills"
        },

        "interests.html": {
            title: "My Interests",
            subtitle: "The things that make me who I am",
            type: "interests"
        },

        "career.html": {
            title: "My Career Path",
            subtitle: "BA → Law → RJS Officer",
            type: "career"
        },

        "future-goal.html": {
            title: "My Future Goal",
            subtitle: "A journey towards becoming an RJS Officer",
            type: "career"
        },

        "contact.html": {
            title: "Let's Connect",
            subtitle: "Ideas, conversations and meaningful connections",
            type: "contact"
        },

        "connect.html": {
            title: "Let's Connect",
            subtitle: "Ideas, conversations and meaningful connections",
            type: "contact"
        }
    };


    const current =
        pageData[page] || pageData["index.html"];


    /* ---------------------------------------------------------
       FIND / CREATE 3D CONTAINER
    --------------------------------------------------------- */

    let container =
        document.getElementById("three-scene");


    if (!container) {

        container =
            document.createElement("div");

        container.id =
            "three-scene";

        document.body.prepend(container);
    }


    /* ---------------------------------------------------------
       CONTAINER STYLING
    --------------------------------------------------------- */

    container.style.position = "fixed";
    container.style.inset = "0";
    container.style.width = "100%";
    container.style.height = "100%";
    container.style.pointerEvents = "none";
    container.style.zIndex = "-1";
    container.style.overflow = "hidden";


    /* ---------------------------------------------------------
       CHECK THREE.JS
    --------------------------------------------------------- */

    if (typeof THREE === "undefined") {

        console.warn(
            "Three.js was not loaded. " +
            "Please check the Three.js CDN script."
        );

        return;
    }


    /* ---------------------------------------------------------
       SCENE
    --------------------------------------------------------- */

    const scene =
        new THREE.Scene();


    scene.fog =
        new THREE.FogExp2(
            0xfffaf5,
            0.025
        );


    /* ---------------------------------------------------------
       CAMERA
    --------------------------------------------------------- */

    const camera =
        new THREE.PerspectiveCamera(
            45,
            window.innerWidth /
            window.innerHeight,
            0.1,
            100
        );


    camera.position.set(
        0,
        0,
        8
    );


    /* ---------------------------------------------------------
       RENDERER
    --------------------------------------------------------- */

    const renderer =
        new THREE.WebGLRenderer({
            alpha: true,
            antialias: !isMobile,
            powerPreference: "high-performance"
        });


    renderer.setPixelRatio(
        Math.min(
            window.devicePixelRatio,
            isMobile ? 1.25 : 2
        )
    );


    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );


    renderer.outputColorSpace =
        THREE.SRGBColorSpace;


    container.appendChild(
        renderer.domElement
    );


    /* ---------------------------------------------------------
       LIGHTING
    --------------------------------------------------------- */

    const ambientLight =
        new THREE.AmbientLight(
            0xffffff,
            2.1
        );


    scene.add(
        ambientLight
    );


    const lavenderLight =
        new THREE.PointLight(
            0xd8c7ff,
            18,
            20
        );


    lavenderLight.position.set(
        -4,
        3,
        5
    );


    scene.add(
        lavenderLight
    );


    const pinkLight =
        new THREE.PointLight(
            0xffcbdc,
            14,
            18
        );


    pinkLight.position.set(
        4,
        -2,
        4
    );


    scene.add(
        pinkLight
    );


    const warmLight =
        new THREE.PointLight(
            0xffe0b8,
            10,
            15
        );


    warmLight.position.set(
        0,
        4,
        -2
    );


    scene.add(
        warmLight
    );


    /* =========================================================
       MAIN GROUP
       ========================================================= */

    const mainGroup =
        new THREE.Group();


    scene.add(
        mainGroup
    );


    /* =========================================================
       MATERIAL HELPERS
       ========================================================= */

    function glassMaterial(
        color,
        opacity = 0.72
    ) {

        return new THREE.MeshPhysicalMaterial({

            color,

            transparent: true,

            opacity,

            roughness: 0.18,

            metalness: 0.03,

            transmission: 0.25,

            thickness: 0.8,

            clearcoat: 0.8,

            clearcoatRoughness: 0.12

        });
    }


    /* =========================================================
       CREATE CENTRAL ORB
       ========================================================= */

    function createOrb() {

        const geometry =
            new THREE.IcosahedronGeometry(
                isMobile ? 1.35 : 1.65,
                5
            );


        const material =
            glassMaterial(
                0xded2ff,
                0.72
            );


        const orb =
            new THREE.Mesh(
                geometry,
                material
            );


        orb.position.set(
            0,
            0,
            0
        );


        orb.userData.baseY =
            orb.position.y;


        mainGroup.add(
            orb
        );


        /* Inner glowing sphere */

        const innerGeometry =
            new THREE.SphereGeometry(
                isMobile ? 0.65 : 0.82,
                32,
                32
            );


        const innerMaterial =
            new THREE.MeshBasicMaterial({

                color:
                    0xffe8f0,

                transparent:
                    true,

                opacity:
                    0.38

            });


        const inner =
            new THREE.Mesh(
                innerGeometry,
                innerMaterial
            );


        mainGroup.add(
            inner
        );


        return {
            orb,
            inner
        };
    }


    /* =========================================================
       CREATE RINGS
       ========================================================= */

    function createRings() {

        const group =
            new THREE.Group();


        const ringColors = [
            0xd6c5ff,
            0xffcddd,
            0xcdeee0
        ];


        ringColors.forEach(
            (
                color,
                index
            ) => {

                const geometry =
                    new THREE.TorusGeometry(
                        2.05 +
                        index * 0.28,
                        0.018,
                        16,
                        100
                    );


                const material =
                    new THREE.MeshBasicMaterial({

                        color,

                        transparent:
                            true,

                        opacity:
                            0.42

                    });


                const ring =
                    new THREE.Mesh(
                        geometry,
                        material
                    );


                ring.rotation.x =
                    Math.PI / 2 +
                    index * 0.5;


                ring.rotation.y =
                    index * 0.65;


                group.add(
                    ring
                );

            }
        );


        mainGroup.add(
            group
        );


        return group;
    }


    /* =========================================================
       PARTICLE SYSTEM
       ========================================================= */

    function createParticles() {

        const count =
            isMobile ? 90 : 180;


        const positions =
            new Float32Array(
                count * 3
            );


        const sizes =
            new Float32Array(
                count
            );


        for (
            let i = 0;
            i < count;
            i++
        ) {

            const radius =
                3.2 +
                Math.random() * 5;


            const angle =
                Math.random() *
                Math.PI * 2;


            positions[i * 3] =
                Math.cos(angle) *
                radius;


            positions[i * 3 + 1] =
                (
                    Math.random() - 0.5
                ) * 6;


            positions[i * 3 + 2] =
                Math.sin(angle) *
                radius;


            sizes[i] =
                0.5 +
                Math.random() * 1.2;
        }


        const geometry =
            new THREE.BufferGeometry();


        geometry.setAttribute(
            "position",
            new THREE.BufferAttribute(
                positions,
                3
            )
        );


        const material =
            new THREE.PointsMaterial({

                color:
                    0xd4c5e8,

                size:
                    isMobile
                        ? 0.025
                        : 0.035,

                transparent:
                    true,

                opacity:
                    0.7,

                depthWrite:
                    false

            });


        const particles =
            new THREE.Points(
                geometry,
                material
            );


        scene.add(
            particles
        );


        return particles;
    }


    /* =========================================================
       PAGE-SPECIFIC 3D ELEMENTS
       ========================================================= */

    let centralOrb =
        null;

    let rings =
        null;

    let particles =
        null;

    let extraObjects =
        [];


    /* =========================================================
       HOME SCENE
       ========================================================= */

    function homeScene() {

        const result =
            createOrb();


        centralOrb =
            result.orb;


        mainGroup.add(
            result.inner
        );


        rings =
            createRings();


        particles =
            createParticles();


        return;
    }


    /* =========================================================
       ABOUT SCENE
       ========================================================= */

    function aboutScene() {

        const result =
            createOrb();


        centralOrb =
            result.orb;


        rings =
            createRings();


        particles =
            createParticles();


        /* Floating small spheres */

        for (
            let i = 0;
            i < 5;
            i++
        ) {

            const geometry =
                new THREE.SphereGeometry(
                    0.12 +
                    Math.random() * 0.08,
                    20,
                    20
                );


            const material =
                glassMaterial(
                    i % 2 === 0
                        ? 0xffdce8
                        : 0xded2ff,
                    0.8
                );


            const sphere =
                new THREE.Mesh(
                    geometry,
                    material
                );


            sphere.position.set(
                (Math.random() - 0.5) * 6,
                (Math.random() - 0.5) * 4,
                (Math.random() - 0.5) * 3
            );


            sphere.userData.offset =
                Math.random() * 10;


            mainGroup.add(
                sphere
            );


            extraObjects.push(
                sphere
            );
        }
    }


    /* =========================================================
       JOURNEY SCENE
       ========================================================= */

    function journeyScene() {

        particles =
            createParticles();


        /*
         * A flowing 3D path
         * representing personal growth.
         */

        const curve =
            new THREE.CatmullRomCurve3([
                new THREE.Vector3(
                    -4,
                    -1.4,
                    0
                ),

                new THREE.Vector3(
                    -2.2,
                    0.2,
                    0.5
                ),

                new THREE.Vector3(
                    -0.7,
                    -0.4,
                    0
                ),

                new THREE.Vector3(
                    0.8,
                    0.8,
                    0.5
                ),

                new THREE.Vector3(
                    2.2,
                    0.3,
                    0
                ),

                new THREE.Vector3(
                    4,
                    1.5,
                    0.5
                )
            ]);


        const tubeGeometry =
            new THREE.TubeGeometry(
                curve,
                80,
                0.035,
                12,
                false
            );


        const tubeMaterial =
            new THREE.MeshBasicMaterial({

                color:
                    0xcbbbe8,

                transparent:
                    true,

                opacity:
                    0.8

            });


        const tube =
            new THREE.Mesh(
                tubeGeometry,
                tubeMaterial
            );


        mainGroup.add(
            tube
        );


        /* Journey milestones */

        const milestoneData = [
            "School",
            "Navodaya",
            "Leadership",
            "Graduation",
            "AI & Skills",
            "RJS Goal"
        ];


        milestoneData.forEach(
            (
                label,
                index
            ) => {

                const point =
                    curve.getPoint(
                        index /
                        (
                            milestoneData.length - 1
                        )
                    );


                const geometry =
                    new THREE.SphereGeometry(
                        0.12,
                        20,
                        20
                    );


                const material =
                    glassMaterial(
                        index % 2 === 0
                            ? 0xded2ff
                            : 0xffd4e2,
                        0.9
                    );


                const marker =
                    new THREE.Mesh(
                        geometry,
                        material
                    );


                marker.position.copy(
                    point
                );


                marker.userData.label =
                    label;


                marker.userData.offset =
                    index * 0.6;


                mainGroup.add(
                    marker
                );


                extraObjects.push(
                    marker
                );

            }
        );

    }


    /* =========================================================
       ACHIEVEMENT SCENE
       ========================================================= */

    function achievementsScene() {

        particles =
            createParticles();


        const achievements = [
            "Excellent Performance",
            "Literary Prefect",
            "Best Anchoring",
            "English Proficiency",
            "Story Writing",
            "Essay Writing"
        ];


        achievements.forEach(
            (
                title,
                index
            ) => {

                const geometry =
                    new THREE.OctahedronGeometry(
                        0.38,
                        1
                    );


                const material =
                    glassMaterial(
                        index % 2 === 0
                            ? 0xded2ff
                            : 0xffd4e2,
                        0.82
                    );


                const badge =
                    new THREE.Mesh(
                        geometry,
                        material
                    );


                const angle =
                    (
                        index /
                        achievements.length
                    ) *
                    Math.PI * 2;


                badge.position.set(
                    Math.cos(angle) * 2.4,
                    Math.sin(angle) * 1.5,
                    Math.sin(angle) * 0.7
                );


                badge.userData.offset =
                    index;


                badge.userData.title =
                    title;


                mainGroup.add(
                    badge
                );


                extraObjects.push(
                    badge
                );

            }
        );


        const core =
            createOrb();


        centralOrb =
            core.orb;
    }


    /* =========================================================
       SKILLS SCENE
       ========================================================= */

    function skillsScene() {

        particles =
            createParticles();


        const skills = [
            "English",
            "Stenography",
            "Teaching",
            "AI",
            "Social Media",
            "Web Development",
            "Public Speaking",
            "Communication"
        ];


        const radius =
            isMobile ? 1.8 : 2.6;


        skills.forEach(
            (
                skill,
                index
            ) => {

                const geometry =
                    new THREE.SphereGeometry(
                        0.17,
                        20,
                        20
                    );


                const material =
                    glassMaterial(
                        index % 2 === 0
                            ? 0xded2ff
                            : 0xffd6e4,
                        0.85
                    );


                const node =
                    new THREE.Mesh(
                        geometry,
                        material
                    );


                const phi =
                    Math.acos(
                        1 -
                        2 *
                        (
                            index + 0.5
                        ) /
                        skills.length
                    );


                const theta =
                    Math.PI *
                    (
                        1 +
                        Math.sqrt(5)
                    ) *
                    index;


                node.position.set(
                    radius *
                    Math.sin(phi) *
                    Math.cos(theta),

                    radius *
                    Math.cos(phi),

                    radius *
                    Math.sin(phi) *
                    Math.sin(theta)
                );


                node.userData.skill =
                    skill;


                mainGroup.add(
                    node
                );


                extraObjects.push(
                    node
                );

            }
        );


        const core =
            createOrb();


        centralOrb =
            core.orb;

    }


    /* =========================================================
       INTERESTS SCENE
       ========================================================= */

    function interestsScene() {

        particles =
            createParticles();


        const objects = [
            {
                name: "Reading",
                geometry:
                    new THREE.BoxGeometry(
                        0.75,
                        0.12,
                        0.95
                    ),
                color:
                    0xded2ff
            },

            {
                name: "Music",
                geometry:
                    new THREE.TorusGeometry(
                        0.32,
                        0.07,
                        16,
                        40
                    ),
                color:
                    0xffd4e2
            },

            {
                name: "Dance",
                geometry:
                    new THREE.SphereGeometry(
                        0.3,
                        20,
                        20
                    ),
                color:
                    0xd8f1e6
            },

            {
                name: "Spanish",
                geometry:
                    new THREE.OctahedronGeometry(
                        0.35
                    ),
                color:
                    0xffe3c9
            }
        ];


        objects.forEach(
            (
                object,
                index
            ) => {

                const material =
                    glassMaterial(
                        object.color,
                        0.82
                    );


                const mesh =
                    new THREE.Mesh(
                        object.geometry,
                        material
                    );


                const angle =
                    (
                        index /
                        objects.length
                    ) *
                    Math.PI * 2;


                mesh.position.set(
                    Math.cos(angle) * 2.1,
                    Math.sin(angle) * 1.2,
                    0
                );


                mesh.userData.offset =
                    index;


                mesh.userData.name =
                    object.name;


                mainGroup.add(
                    mesh
                );


                extraObjects.push(
                    mesh
                );

            }
        );

    }


    /* =========================================================
       CAREER SCENE
       ========================================================= */

    function careerScene() {

        particles =
            createParticles();


        /*
         * 3D staircase representing:
         *
         * BA
         * ↓
         * LAW
         * ↓
         * JUDICIAL PREPARATION
         * ↓
         * RJS OFFICER
         */

        const steps = [
            "BA",
            "LAW",
            "JUDICIAL PREPARATION",
            "RJS OFFICER"
        ];


        steps.forEach(
            (
                step,
                index
            ) => {

                const geometry =
                    new THREE.BoxGeometry(
                        1.7,
                        0.28,
                        1.1
                    );


                const material =
                    glassMaterial(
                        index % 2 === 0
                            ? 0xded2ff
                            : 0xffd7e5,
                        0.88
                    );


                const block =
                    new THREE.Mesh(
                        geometry,
                        material
                    );


                block.position.set(
                    (
                        index -
                        1.5
                    ) * 1.25,

                    (
                        index
                    ) * 0.55 - 0.9,

                    0
                );


                block.rotation.y =
                    -0.12;


                block.userData.step =
                    step;


                mainGroup.add(
                    block
                );


                extraObjects.push(
                    block
                );

            }
        );


        const goalGeometry =
            new THREE.IcosahedronGeometry(
                0.65,
                2
            );


        const goalMaterial =
            glassMaterial(
                0xffd5e3,
                0.88
            );


        const goal =
            new THREE.Mesh(
                goalGeometry,
                goalMaterial
            );


        goal.position.set(
            2.3,
            1.2,
            0
        );


        mainGroup.add(
            goal
        );


        centralOrb =
            goal;
    }


    /* =========================================================
       CONTACT SCENE
    ========================================================= */

    function contactScene() {

        particles =
            createParticles();


        const geometry =
            new THREE.TorusKnotGeometry(
                1.35,
                0.22,
                90,
                16
            );


        const material =
            glassMaterial(
                0xded2ff,
                0.7
            );


        const knot =
            new THREE.Mesh(
                geometry,
                material
            );


        mainGroup.add(
            knot
        );


        centralOrb =
            knot;


        extraObjects.push(
            knot
        );

    }


    /* =========================================================
       INITIALIZE PAGE SCENE
    ========================================================= */

    switch (
        current.type
    ) {

        case "home":
            homeScene();
            break;

        case "about":
            aboutScene();
            break;

        case "journey":
            journeyScene();
            break;

        case "achievements":
            achievementsScene();
            break;

        case "skills":
            skillsScene();
            break;

        case "interests":
            interestsScene();
            break;

        case "career":
            careerScene();
            break;

        case "contact":
            contactScene();
            break;

        default:
            homeScene();
            break;
    }


    /* =========================================================
       MOUSE / TOUCH TARGET
    ========================================================= */

    const pointer =
        {
            x: 0,
            y: 0
        };


    const smoothPointer =
        {
            x: 0,
            y: 0
        };


    window.addEventListener(
        "pointermove",
        event => {

            pointer.x =
                (
                    event.clientX /
                    window.innerWidth
                ) * 2 - 1;


            pointer.y =
                -(
                    event.clientY /
                    window.innerHeight
                ) * 2 + 1;

        },
        {
            passive: true
        }
    );


    /* =========================================================
       SCROLL TRACKING
    ========================================================= */

    let scrollY =
        window.scrollY;


    window.addEventListener(
        "scroll",
        () => {

            scrollY =
                window.scrollY;

        },
        {
            passive: true
        }
    );


    /* =========================================================
       ANIMATION LOOP
    ========================================================= */

    const clock =
        new THREE.Clock();


    function animate() {

        requestAnimationFrame(
            animate
        );


        const elapsed =
            clock.getElapsedTime();


        if (!prefersReducedMotion) {

            /* Smooth pointer */

            smoothPointer.x +=
                (
                    pointer.x -
                    smoothPointer.x
                ) * 0.035;


            smoothPointer.y +=
                (
                    pointer.y -
                    smoothPointer.y
                ) * 0.035;


            /* Main group movement */

            mainGroup.rotation.y =
                smoothPointer.x *
                0.10;


            mainGroup.rotation.x =
                smoothPointer.y *
                0.055;


            mainGroup.position.y =
                Math.sin(
                    elapsed * 0.55
                ) * 0.06;


            /* Central object */

            if (centralOrb) {

                centralOrb.rotation.x +=
                    0.0025;


                centralOrb.rotation.y +=
                    0.004;


                centralOrb.position.y =
                    Math.sin(
                        elapsed * 0.8
                    ) * 0.12;

            }


            /* Rings */

            if (rings) {

                rings.rotation.x +=
                    0.0015;


                rings.rotation.y +=
                    0.0025;


                rings.rotation.z =
                    Math.sin(
                        elapsed * 0.25
                    ) * 0.08;

            }


            /* Extra objects */

            extraObjects.forEach(
                (
                    object,
                    index
                ) => {

                    const offset =
                        object.userData.offset ||
                        index;


                    object.rotation.x +=
                        0.001 +
                        index * 0.0001;


                    object.rotation.y +=
                        0.002 +
                        index * 0.00015;


                    object.position.y +=
                        Math.sin(
                            elapsed * 0.7 +
                            offset
                        ) * 0.0015;

                }
            );


            /* Particles */

            if (particles) {

                particles.rotation.y =
                    elapsed * 0.018;


                particles.rotation.x =
                    Math.sin(
                        elapsed * 0.15
                    ) * 0.04;

            }


            /* Camera parallax */

            camera.position.x +=
                (
                    smoothPointer.x *
                    0.35 -
                    camera.position.x
                ) * 0.025;


            camera.position.y +=
                (
                    smoothPointer.y *
                    0.25 -
                    camera.position.y
                ) * 0.025;


            /*
             * Very subtle scroll depth.
             * This prevents the scene from
             * feeling completely static.
             */

            camera.position.z =
                8 +
                Math.min(
                    scrollY * 0.0008,
                    1.2
                );

        }


        renderer.render(
            scene,
            camera
        );

    }


    animate();


    /* =========================================================
       RESPONSIVE RESIZE
    ========================================================= */

    window.addEventListener(
        "resize",
        () => {

            camera.aspect =
                window.innerWidth /
                window.innerHeight;


            camera.updateProjectionMatrix();


            renderer.setPixelRatio(
                Math.min(
                    window.devicePixelRatio,
                    window.innerWidth < 700
                        ? 1.25
                        : 2
                )
            );


            renderer.setSize(
                window.innerWidth,
                window.innerHeight
            );

        }
    );


    /* =========================================================
       CLEANUP WHEN LEAVING PAGE
    ========================================================= */

    window.addEventListener(
        "beforeunload",
        () => {

            renderer.dispose();


            scene.traverse(
                object => {

                    if (
                        object.geometry
                    ) {

                        object.geometry.dispose();

                    }


                    if (
                        object.material
                    ) {

                        if (
                            Array.isArray(
                                object.material
                            )
                        ) {

                            object.material
                                .forEach(
                                    material =>
                                        material.dispose()
                                );

                        } else {

                            object.material.dispose();

                        }

                    }

                }
            );

        }
    );

})();
