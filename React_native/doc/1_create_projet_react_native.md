# Creer un projet react native 59.3 ou 59.9 avec la libairie viro media

## Pour créer un projet react-native dans l'invite de commande (CMD) windows

Installer react.js (en globale)

    > npm install -g create-react-app

Puis installer la cli de react-native (en globale) dans l'invite de commande (CMD) windows

    > npm install -g react-native-cli

Puis faite, la commande ci-dessous pour vérifier que c'est bien installer 

    > react-native -v


## Installer la libairie viro media 

Dans l'invite de commande (CMD) windows

    > react-native init ViroSample --version=0.59.3

Ou cette version qui permettra de ne pas avoir d'erreur après avoir fait la commande `> npm install -S -E react-viro`

    > react-native init ViroSample --version=0.59.9

remarque : La version 0.59.9 ne passe pas sur Android studio

Puis 

    > cd ViroSample

Puis toujours dans l'invite de commande (CMD) windows

    > npm install -S -E react-viro

Si à cette étape il y a des erreurs lors de l'installation rajouter --legacy-peer-deps

    > npm install -S -E react-viro --legacy-peer-deps


Puis 


    Copiez les fichiers de node_modules \ react-viro \ bin \ files \ javascript \ * à la racine de votre répertoire.

    Cela devrait remplacer les fichiers index.js et App.js et ajouter metro.config.js, rn-cli.config.js et un répertoire js / à votre projet ViroSample.

Puis

    > npm start

S'il y a cette erreur après le npm start

    error Invalid regular expression: /(.*\\__fixtures__\\.*|node_modules[\\\]react[\\\]dist[\\\].*|website\\node_modules\\.*|heapCapture\\bundle\.js|.*\\__tests__\\.*)$/: Unterminated character class. Run CLI with --verbose flag for more details.

Aller dans le dossier \node_modules\metro-config\src\defaults\blacklist.js et modifier la première ligne de sharedBlacklist

Avant :

    var sharedBlacklist = [
        /node_modules[/\\]react[/\\]dist[/\\].*/,
        /website\/node_modules\/.*/,
        /heapCapture\/bundle\.js/,
        /.*\/__tests__\/.*/
    ];

Après :

    var sharedBlacklist = [
        /node_modules[\/\\]react[\/\\]dist[\/\\].*/,
        /website\/node_modules\/.*/,
        /heapCapture\/bundle\.js/,
        /.*\/__tests__\/.*/
    ];



## Télécharger viro media sur le telephone et se connecter avec une adresse ngrok dans l'onglet < Enter Testbed > de viro media

Si vous n'avez pas d'adresse ngrok

## Installer ngrok sur l'ordinateur

Télécharger le dossier zip de ngrok à cette adresse https://ngrok.com/download 

Décomprésser l'executable (le fichier `ngrok.exe`). 

- 1) Créer un dossier nommé "ngrok" spécialement pour l'executable ngrok (le fichier `ngrok.exe`), dans votre projet afin de pouvoir utiliser la commande `ngrok` dans le terminale, qui pointe sur votre projet, après avoir mis le dossier qui contient l'executable ngrok (le fichier `ngrok.exe`) dans la `variable d'environnement PATH` exemple (votre_projet/ngrok/)

ou

- 2) (Facultatif) Créer un dossier nommé "ngrok" spécialement pour l'executable ngrok (le fichier `ngrok.exe`) dans cette adresse par exemple `C:/Programmes` et mettre le dossier qui contient l'executable ngrok (le fichier `ngrok.exe`) dans la `variable d'environnement PATH`, exemple (C:/Programmes/ngrok/), afin d'utiliser la ligne de commande `ngrok` partout. 

Puis se connecter dans ngrok à cette adresse https://dashboard.ngrok.com/signup , afin de pouvoir récupérer un authtoken

Une fois récupérer le authtoken , taper en ligne de commande `> ngrok authtoken + votre authtoken` :

    > ngrok authtoken <your_auth_token>

Puis tapez dans l'invite de commande (CMD) windows `> ngrok http + le port ou est executer le projet` 

    > ngrok http 8081


## Android Studio

Utiliser Android Studio (au lieu d'utiliser l'application mobile Viro Media + ngrok), ce qui nous permettra d'utiliser les dépendances react-native de géolocalisation.

Pour utiliser la librairie ViroReact avec Android Studio , il faut :

- 1) Bien installer Android Studio, et brancher son téléphone sur l'ordinateur avec `le mode développeur activer et Débogage USB activer`, pour les activer il faut aller dans :
    - paramètres -> à propos du téléphone -> information sur le logiciel -> Numéro de version (cliquer 7 fois dessus)

    - retourner sur `paramètres` et clique sur l'onglet `Options de développement`

- 2) La version 0.59.3 de react native : `react-native init nom_du_projet --version=0.59.3` 

- 3) Suivre les instructions plus haut, qui sont après la commande : `react-native init nom_du_projet --version=0.59.3` 

- 4) Copier le fichier `setup-ide.sh` qui ce trouve à cette adresse `nom_du_projet\node_modules\react-viro\bin\setup-ide.sh` et le coller à la racine du projet

- 5) Mettre `<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />` dans le fichier : `ViroSample\android\app\src\main\AndroidManifest.xml`, pour demader a l'utilisateur la permisson d'avoir sa localisation

- 6) Ouvrir un premier Terminal et executer la commande :

    > ./setup-ide.sh --android

    ou 

    > setup-ide.sh --android

    puis

    > react-native start

Attendre que le graphique de dépendances se charge

- 7) S'assurer que votre emulateur est en marche et que votre vrai mobile est connecter a votre ordinateur en mode developpement

- 8) Ouvrir un deuxième Terminal et executer la commande :

    > react-native run-android --variant=gvrDebug

Bravo !!!


## Avec @react-native-community/geolocation

pour l'instan dans le fichier `ViroSample\node_modules\@react-native-community\geolocation\android\src\main\java\com\reactnativecommunity\geolocation\GeolocationModule.java` pour la geolocalisation avec `@react-native-community/geolocation` il faut commenter


- la ligne 21 `import androidx.core.content.ContextCompat;`


- la ligne 274 a 276 

    int finePermission = ContextCompat.checkSelfPermission(getReactApplicationContext(), android.Manifest.permission.ACCESS_FINE_LOCATION);
    if (provider.equals(LocationManager.GPS_PROVIDER) && finePermission != PackageManager.PERMISSION_GRANTED) {
       return null;
    }



## Pour React Native 64 classic avec Viro react (sans Expo)

- Mettre `Viro` dans le `package.json` et faire `yarn install`

    "dependencies": {
        ...
        "react-viro": "2.7.3"
    }

    > yarn install


- Installer `@viro-community/react-viro`.

Dans le node_modules, il redige le dossier react-viro vers les bons composants dont il a besion pour fontionner dans le dossier react-native. react-native a mis ces composants dans des fichiers déprécié


    > @viro-community/react-viro

- Configurer le fichier  `name_projet\android\app\src\main\AndroidManifest.xml`

### Dans AndroidManifest.xml

    <manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.name_projet">

        <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
        <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
        <uses-permission android:name="android.permission.CAMERA" />
        <uses-permission android:name="android.permission.INTERNET" />
        <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
        <uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW"/>
        <uses-feature android:name="android.hardware.camera" android:required="false"/>
        <uses-feature android:name="android.hardware.camera.autofocus" android:required="false"/>

        <application
        android:name=".MainApplication"
        android:label="@string/app_name"
        android:icon="@mipmap/ic_launcher"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:allowBackup="false"
        android:theme="@style/AppTheme">
        <activity
            android:name=".MainActivity"
            android:label="@string/app_name"
            android:configChanges="keyboard|keyboardHidden|orientation|screenSize|uiMode"
            android:launchMode="singleTask"
            android:windowSoftInputMode="adjustResize">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
                <category android:name="com.google.intent.category.DAYDREAM" />
                <category android:name="com.google.intent.category.CARDBOARD" />
            </intent-filter>
        </activity>
        <activity android:name="com.facebook.react.devsupport.DevSettingsActivity" />
    +     <meta-data android:name="com.google.ar.core" android:value="optional" />
        <meta-data android:name="com.google.android.maps.v2.API_KEY" android:value="AIzaSyCspwLQtXxmjlUbe9kuHxdydpYialZMw7Q"/>
        </application>
        <meta-data android:name="com.samsung.android.vr.application.mode" android:value="vr_only"/>
    </manifest>


- Configurer le fichier `name_projet\android\app\build.gradle`

### Dans app\build.gradle

    apply plugin: "com.android.application"

    import com.android.build.OutputFile

    /**
    * The react.gradle file registers a task for each build variant (e.g. bundleDebugJsAndAssets
    * and bundleReleaseJsAndAssets).
    * These basically call `react-native bundle` with the correct arguments during the Android build
    * cycle. By default, bundleDebugJsAndAssets is skipped, as in debug/dev mode we prefer to load the
    * bundle directly from the development server. Below you can see all the possible configurations
    * and their defaults. If you decide to add a configuration block, make sure to add it before the
    * `apply from: "../../node_modules/react-native/react.gradle"` line.
    *
    * project.ext.react = [
    *   // the name of the generated asset file containing your JS bundle
    *   bundleAssetName: "index.android.bundle",
    *
    *   // the entry file for bundle generation. If none specified and
    *   // "index.android.js" exists, it will be used. Otherwise "index.js" is
    *   // default. Can be overridden with ENTRY_FILE environment variable.
    *   entryFile: "index.android.js",
    *
    *   // https://reactnative.dev/docs/performance#enable-the-ram-format
    *   bundleCommand: "ram-bundle",
    *
    *   // whether to bundle JS and assets in debug mode
    *   bundleInDebug: false,
    *
    *   // whether to bundle JS and assets in release mode
    *   bundleInRelease: true,
    *
    *   // whether to bundle JS and assets in another build variant (if configured).
    *   // See http://tools.android.com/tech-docs/new-build-system/user-guide#TOC-Build-Variants
    *   // The configuration property can be in the following formats
    *   //         'bundleIn${productFlavor}${buildType}'
    *   //         'bundleIn${buildType}'
    *   // bundleInFreeDebug: true,
    *   // bundleInPaidRelease: true,
    *   // bundleInBeta: true,
    *
    *   // whether to disable dev mode in custom build variants (by default only disabled in release)
    *   // for example: to disable dev mode in the staging build type (if configured)
    *   devDisabledInStaging: true,
    *   // The configuration property can be in the following formats
    *   //         'devDisabledIn${productFlavor}${buildType}'
    *   //         'devDisabledIn${buildType}'
    *
    *   // the root of your project, i.e. where "package.json" lives
    *   root: "../../",
    *
    *   // where to put the JS bundle asset in debug mode
    *   jsBundleDirDebug: "$buildDir/intermediates/assets/debug",
    *
    *   // where to put the JS bundle asset in release mode
    *   jsBundleDirRelease: "$buildDir/intermediates/assets/release",
    *
    *   // where to put drawable resources / React Native assets, e.g. the ones you use via
    *   // require('./image.png')), in debug mode
    *   resourcesDirDebug: "$buildDir/intermediates/res/merged/debug",
    *
    *   // where to put drawable resources / React Native assets, e.g. the ones you use via
    *   // require('./image.png')), in release mode
    *   resourcesDirRelease: "$buildDir/intermediates/res/merged/release",
    *
    *   // by default the gradle tasks are skipped if none of the JS files or assets change; this means
    *   // that we don't look at files in android/ or ios/ to determine whether the tasks are up to
    *   // date; if you have any other folders that you want to ignore for performance reasons (gradle
    *   // indexes the entire tree), add them here. Alternatively, if you have JS files in android/
    *   // for example, you might want to remove it from here.
    *   inputExcludes: ["android/**", "ios/**"],
    *
    *   // override which node gets called and with what additional arguments
    *   nodeExecutableAndArgs: ["node"],
    *
    *   // supply additional arguments to the packager
    *   extraPackagerArgs: []
    * ]
    */

    project.ext.react = [
        enableHermes: false,  // clean and rebuild if changing
    ]

    apply from: "../../node_modules/react-native/react.gradle"

    /**
    * Set this to true to create two separate APKs instead of one:
    *   - An APK that only works on ARM devices
    *   - An APK that only works on x86 devices
    * The advantage is the size of the APK is reduced by about 4MB.
    * Upload all the APKs to the Play Store and people will download
    * the correct one based on the CPU architecture of their device.
    */
    def enableSeparateBuildPerCPUArchitecture = false

    /**
    * Run Proguard to shrink the Java bytecode in release builds.
    */
    def enableProguardInReleaseBuilds = false

    /**
    * The preferred build flavor of JavaScriptCore.
    *
    * For example, to use the international variant, you can use:
    * `def jscFlavor = 'org.webkit:android-jsc-intl:+'`
    *
    * The international variant includes ICU i18n library and necessary data
    * allowing to use e.g. `Date.toLocaleString` and `String.localeCompare` that
    * give correct results when using with locales other than en-US.  Note that
    * this variant is about 6MiB larger per architecture than default.
    */
    def jscFlavor = 'org.webkit:android-jsc:+'

    /**
    * Whether to enable the Hermes VM.
    *
    * This should be set on project.ext.react and mirrored here.  If it is not set
    * on project.ext.react, JavaScript will not be compiled to Hermes Bytecode
    * and the benefits of using Hermes will therefore be sharply reduced.
    */
    def enableHermes = project.ext.react.get("enableHermes", false);

    android {
        compileSdkVersion 29
        buildToolsVersion "30.0.2"

        defaultConfig {
            applicationId "com.name_projet"
            minSdkVersion 21
            targetSdkVersion 29
            multiDexEnabled true
            versionCode 1
            versionName "1.0"
            testInstrumentationRunner "android.support.test.runner.AndroidJUnitRunner"
            vectorDrawables.useSupportLibrary = true
        }
        splits {
            abi {
                reset()
                enable enableSeparateBuildPerCPUArchitecture
                universalApk false  // If true, also generate a universal APK
                include "armeabi-v7a", "x86", "arm64-v8a", "x86_64"
            }
        }
        signingConfigs {
            debug {
                storeFile file('debug.keystore')
                storePassword 'android'
                keyAlias 'androiddebugkey'
                keyPassword 'android'
            }
        }
        flavorDimensions "tier"
        productFlavors {
            ar {
                dimension "tier"
                resValue 'string', 'app_name', 'name_projet-ar'
                buildConfigField 'String', 'VR_PLATFORM', '"GVR"' //default to GVR
            }
            gvr {
                dimension "tier"
                resValue 'string', 'app_name', 'name_projet-gvr'
                buildConfigField 'String', 'VR_PLATFORM', '"GVR"'
            }
            ovr {
                dimension "tier"
                resValue 'string', 'app_name', 'name_projet-ovr'
                applicationIdSuffix '.ovr'
                buildConfigField 'String', 'VR_PLATFORM', '"OVR_MOBILE"'
            }
        }
        buildTypes {
            debug {
                signingConfig signingConfigs.debug
            }
            release {
                // Caution! In production, you need to generate your own keystore file.
                // see https://reactnative.dev/docs/signed-apk-android.
                // signingConfig signingConfigs.debug
                // minifyEnabled enableProguardInReleaseBuilds
                minifyEnabled false
                proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
            }
        }

        // applicationVariants are e.g. debug, release
        applicationVariants.all { variant ->
            variant.outputs.each { output ->
                // For each separate APK per architecture, set a unique version code as described here:
                // https://developer.android.com/studio/build/configure-apk-splits.html
                // Example: versionCode 1 will generate 1001 for armeabi-v7a, 1002 for x86, etc.
                def versionCodes = ["armeabi-v7a": 1, "x86": 2, "arm64-v8a": 3, "x86_64": 4]
                def abi = output.getFilter(OutputFile.ABI)
                if (abi != null) {  // null for the universal-debug, universal-release variants
                    output.versionCodeOverride =
                            defaultConfig.versionCode * 1000 + versionCodes.get(abi)
                }

            }
        }
    }

    dependencies {
        androidTestImplementation('com.android.support.test.espresso:espresso-core:2.2.2', {
            exclude group: 'com.android.support', module: 'support-annotations'
        })
        implementation fileTree(dir: 'libs', include: ['*.jar'])
        implementation 'com.android.support:appcompat-v7:28.0.0'
        implementation 'com.android.support.constraint:constraint-layout:1.1.3'
        implementation 'com.android.support:design:28.0.0'
        testImplementation 'junit:junit:4.12'
        androidTestImplementation 'com.android.support.test:runner:1.0.2'
        implementation 'com.facebook.react:react-native:+'

        implementation project(':arcore_client') // remove this if AR not required
        implementation project(':gvr_common')
        implementation project(path: ':viro_renderer')
        implementation project(path: ':react_viro')

        
        implementation 'com.google.android.exoplayer:exoplayer:2.7.1'
        implementation 'com.google.protobuf.nano:protobuf-javanano:3.0.0-alpha-7'
        implementation 'com.amazonaws:aws-android-sdk-core:2.7.7'
        implementation 'com.amazonaws:aws-android-sdk-ddb:2.7.7'
        implementation 'com.amazonaws:aws-android-sdk-ddb-mapper:2.7.7'
        implementation 'com.amazonaws:aws-android-sdk-cognito:2.7.7'
        implementation 'com.amazonaws:aws-android-sdk-cognitoidentityprovider:2.7.7'

        debugImplementation("com.facebook.flipper:flipper:${FLIPPER_VERSION}") {
        exclude group:'com.facebook.fbjni'
        }

        debugImplementation("com.facebook.flipper:flipper-network-plugin:${FLIPPER_VERSION}") {
            exclude group:'com.facebook.flipper'
            exclude group:'com.squareup.okhttp3', module:'okhttp'
        }

        debugImplementation("com.facebook.flipper:flipper-fresco-plugin:${FLIPPER_VERSION}") {
            exclude group:'com.facebook.flipper'
        }

        if (enableHermes) {
            def hermesPath = "../../node_modules/hermes-engine/android/";
            debugImplementation files(hermesPath + "hermes-debug.aar")
            releaseImplementation files(hermesPath + "hermes-release.aar")
        } else {
            implementation jscFlavor
        }
    }

    // Run this once to be able to run the application with BUCK
    // puts all compile dependencies into folder libs for BUCK to use
    task copyDownloadableDepsToLibs(type: Copy) {
        from configurations.implementation
        into 'libs'
    }

    apply from: file("../../node_modules/@react-native-community/cli-platform-android/native_modules.gradle"); applyNativeModulesAppBuildGradle(project)


- Configurer le fichier `name_projet\android\build.gradle`

### Dans android\build.gradle

    // Top-level build file where you can add configuration options common to all sub-projects/modules.

    buildscript {
        ext {
            buildToolsVersion = "30.0.2"
            minSdkVersion = 21
            compileSdkVersion = 29
            targetSdkVersion = 29
            ndkVersion = "20.1.5948944"
        }
        repositories {
            maven {
                url 'https://maven.google.com/'
            }
            google()
            jcenter()
        }
        dependencies {
            classpath 'com.android.tools.build:gradle:7.0.0-alpha03'
            // NOTE: Do not place your application dependencies here; they belong
            // in the individual module build.gradle files
        }
    }

    allprojects {
        repositories {
            mavenLocal()
            maven {
                // All of React Native (JS, Obj-C sources, Android binaries) is installed from npm
                url("$rootDir/../node_modules/react-native/android")
            }
            maven {
                // Android JSC is installed from npm
                url("$rootDir/../node_modules/jsc-android/dist")
            }

            google()
            jcenter()
            maven { url 'https://www.jitpack.io' }
        }
    }


- Configurer les fichier `name_projet\android\settings.gradle`, 

    regarder :

        include ':app', ':arcore_client', ':gvr_common', ':viro_renderer', ':react_viro'
        project(':arcore_client').projectDir = new File('../node_modules/@viro-community/react-viro/android/arcore_client')
        project(':gvr_common').projectDir = new File('../node_modules/@viro-community/react-viro/android/gvr_common')
        project(':viro_renderer').projectDir = new File('../node_modules/@viro-community/react-viro/android/viro_renderer')
        project(':react_viro').projectDir = new File('../node_modules/@viro-community/react-viro/android/react_viro')


### Dans android\settings.gradle

    rootProject.name = 'name_projet'
    include ':react-native-maps'
    project(':react-native-maps').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-maps/lib/android')
    include ':react-native-maps'
    project(':react-native-maps').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-maps/lib/android')
    apply from: file("../node_modules/@react-native-community/cli-platform-android/native_modules.gradle"); applyNativeModulesSettingsGradle(settings)

    include ':app', ':arcore_client', ':gvr_common', ':viro_renderer', ':react_viro'
    project(':arcore_client').projectDir = new File('../node_modules/@viro-community/react-viro/android/arcore_client')
    project(':gvr_common').projectDir = new File('../node_modules/@viro-community/react-viro/android/gvr_common')
    project(':viro_renderer').projectDir = new File('../node_modules/@viro-community/react-viro/android/viro_renderer')
    project(':react_viro').projectDir = new File('../node_modules/@viro-community/react-viro/android/react_viro')



- Configurer le fichier `name_projet\android\gradle.properties`

### Dans android\gradle.properties

   
    android.useAndroidX=true
    
    android.enableJetifier=true

    FLIPPER_VERSION=0.75.1

    org.gradle.java.home=C:/Program Files/Java/jdk-15.0.2

- Configurer le fichier `name_projet\android\gradle\wrapper\gradle-wrapper.properties`

### wrapper\gradle-wrapper.properties

Comme dans `android\build.gradle` on a mis `classpath 'com.android.tools.build:gradle:7.0.0-alpha03'` dans `dependencies `, 

ici, il faut mettre la version minimum qu'il devrat supporter `distributionUrl=https\://services.gradle.org/distributions/gradle-6.8-all.zip`

`gradle:7.0.0-alpha03` demande au minimum `gradle-6.8-all.zip`

Dans `wrapper\gradle-wrapper.properties`

    distributionBase=GRADLE_USER_HOME
    distributionPath=wrapper/dists
    distributionUrl=https\://services.gradle.org/distributions/gradle-6.8-all.zip
    zipStoreBase=GRADLE_USER_HOME
    zipStorePath=wrapper/dists



- On met les autres dossiers et fichiers normale de viro react :

    name_projet/

        android/
        ios/

        /js
            res/
            HelloWorldScene.js
            HelloWorldSceneAR.js
        
        App.js
        index.android.js
        index.ios.js
        index.js
        metro.config.js
        rn-cli.config.js
        setup-ide.sh



- Ouvrir un premier Terminal et executer la commande :

    > react-native start

- S'assurer que votre emulateur est en marche et que votre vrai mobile est connecter a votre ordinateur en mode developpement

- Ouvrir un deuxième Terminal et executer la commande :

    > react-native run-android --variant=gvrDebug

Bravo !!!