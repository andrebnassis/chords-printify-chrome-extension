// This script gets injected into any opened page
// whose URL matches the pattern defined in the manifest
// (see "content_script" key).
// Several foreground scripts can be declared
// and injected into the same or different pages.

console.log("This prints to the console of the page (injected only if the page url matched)")

chrome.runtime.onMessage.addListener((obj, sender, response) => {

    const {type, data} = obj;
    console.log(type);
    console.log(data);



const logo = document.querySelector('img.logo');
const compositor = document.querySelector('small.compositor');
const cifraclubSideMenu = document.querySelector('#side-menu');
let extensionSideMenu = document.querySelector('div[data-id="cifra-extension"]')

if(extensionSideMenu){
    return;
}
/* Create Side Menu Section */

extensionSideMenu = document.createElement('div');
extensionSideMenu.setAttribute('id', 'side-menu');
extensionSideMenu.dataset.id='cifra-extension';
extensionSideMenu.classList.add('g-side');
extensionSideMenu.style.marginTop = '370px'
extensionSideMenu.style.height = '300px'
extensionSideMenu.style.width = '150px'
extensionSideMenu.style.overflow = 'auto'

const extensionSideMenuMainTitle = document.createElement('strong');
extensionSideMenuMainTitle.appendChild(document.createTextNode('Cifra Extension'));

const extensionSideMenuList = document.createElement('ul');

const extensionSideMenuListHeaderSection = document.createElement('li');
const extensionSideMenuListHeaderSectionTitle = document.createElement('small');
extensionSideMenuListHeaderSectionTitle.appendChild(document.createTextNode('Header'));
extensionSideMenuListHeaderSection.appendChild(extensionSideMenuListHeaderSectionTitle);
extensionSideMenuListHeaderSection.appendChild(document.createElement('hr'));

const logoButtonExtContainer = document.createElement('span');
logoButtonExtContainer.classList.add('inp_opt','small');
const logo_button_ext = document.createElement('input');
logo_button_ext.setAttribute('type', 'checkbox');
logo_button_ext.setAttribute('id', 'exib_logo');
logo_button_ext.setAttribute('checked', logo.checked);
const logo_button_ext_label = document.createElement('label');
logo_button_ext_label.setAttribute('for','exib_logo');
logo_button_ext_label.appendChild(document.createTextNode('Show logo'));

logoButtonExtContainer.appendChild(logo_button_ext);
logoButtonExtContainer.appendChild(logo_button_ext_label);


const optimizeTitleButtonExtContainer = document.createElement('span');
optimizeTitleButtonExtContainer.classList.add('inp_opt','small');
const optimize_title_button_ext = document.createElement('input');
optimize_title_button_ext.setAttribute('type', 'checkbox');
optimize_title_button_ext.setAttribute('id', 'optimize_title');
const optimize_title_button_ext_label = document.createElement('label');
optimize_title_button_ext_label.setAttribute('for','optimize_title');
optimize_title_button_ext_label.appendChild(document.createTextNode('Optimize Title'));

optimizeTitleButtonExtContainer.appendChild(optimize_title_button_ext);
optimizeTitleButtonExtContainer.appendChild(optimize_title_button_ext_label);

const compositorButtonExtContainer = document.createElement('span');
compositorButtonExtContainer.classList.add('inp_opt','small');
const compositor_button_ext = document.createElement('input');
compositor_button_ext.setAttribute('type', 'checkbox');
compositor_button_ext.setAttribute('id', '#exib_compositor');
compositor_button_ext.setAttribute('checked', compositor.checked);
const compositor_button_ext_label = document.createElement('label');
compositor_button_ext_label.setAttribute('for','#exib_compositor');
compositor_button_ext_label.appendChild(document.createTextNode('Show Compositor'));

compositorButtonExtContainer.appendChild(compositor_button_ext);
compositorButtonExtContainer.appendChild(compositor_button_ext_label);


extensionSideMenuListHeaderSection.appendChild(logoButtonExtContainer);
extensionSideMenuListHeaderSection.appendChild(document.createElement('br'));
extensionSideMenuListHeaderSection.appendChild(document.createElement('br'));
extensionSideMenuListHeaderSection.appendChild(optimizeTitleButtonExtContainer);
extensionSideMenuListHeaderSection.appendChild(document.createElement('br'));
extensionSideMenuListHeaderSection.appendChild(document.createElement('br'));
extensionSideMenuListHeaderSection.appendChild(compositorButtonExtContainer);


const extensionSideMenuChordsSection = document.createElement('li');
const extensionSideMenuListChordsSectionTitle = document.createElement('small');
extensionSideMenuListChordsSectionTitle.appendChild(document.createTextNode('Chords'));
const extensionSideMenuChordsList = document.createElement('ul');
extensionSideMenuChordsList.setAttribute('id','chords');

extensionSideMenuChordsSection.appendChild(extensionSideMenuListChordsSectionTitle);
extensionSideMenuChordsSection.appendChild(document.createElement('hr'));
extensionSideMenuChordsSection.appendChild(extensionSideMenuChordsList);



extensionSideMenuList.appendChild(extensionSideMenuListHeaderSection);
extensionSideMenuList.appendChild(extensionSideMenuChordsSection);

extensionSideMenu.appendChild(extensionSideMenuMainTitle);
extensionSideMenu.appendChild(document.createElement('hr'));
extensionSideMenu.appendChild(extensionSideMenuList);


cifraclubSideMenu.parentNode.insertBefore(extensionSideMenu,cifraclubSideMenu.nextSibling);

/* End of Create Side Menu Section */


const displayTargetElement = (elem, shouldDisplay) => {
    if (shouldDisplay) {
        elem.style.display = 'block';
      } else {
        elem.style.display = 'none';
      }
    
}

logo_button_ext.addEventListener('change', (ev) =>  {
    displayTargetElement(logo, logo_button_ext.checked);

})

compositor_button_ext.addEventListener('change', (ev) =>  {
    displayTargetElement(compositor, compositor_button_ext.checked);

})

optimize_title_button_ext.addEventListener('change', (ev) =>  {

    if(optimize_title_button_ext.checked){
        optimizeTitle();
    }
    else{
        undoOptimizeTitle();
    }

})


const optimizeTitle = () => {
    const header = document.querySelector('div.cifra_header');
    const title = header.querySelector('h1');
    title.style.lineHeight = 0;
    const band = header.querySelector('h2');
    band.style.lineHeight = 0;
    band.style.marginBottom = 0;

    const bandTitleWrapper = document.createElement('div');
    bandTitleWrapper.setAttribute('id', 'optimize_title_band_container');
    bandTitleWrapper.appendChild(title);
    let separator = document.createElement('h1');
    bandTitleWrapper.appendChild(separator);
    separator.style.margin = '0 5px 0 5px';
    separator.appendChild(document.createTextNode('-'));

    bandTitleWrapper.appendChild(band);
    bandTitleWrapper.style.display = 'flex';
    bandTitleWrapper.style.flexDirection = 'row';
    bandTitleWrapper.style.alignItems = 'baseline';

    header.style.display = 'flex';
    header.style.flexDirection = 'column';
    header.style.marginBottom = '10px';

    header.insertBefore(bandTitleWrapper, header.firstChild);

}

const undoOptimizeTitle = () => {
    const header = document.querySelector('div.cifra_header');
    header.style.display = 'block';
    header.style.flexDirection = null;
    header.style.marginBottom = '25px';

    const optimize_title_band_container = header.querySelector('#optimize_title_band_container');
    const title = optimize_title_band_container.querySelector('h1.t1');
    title.style.lineHeight = '37px';
    const band = optimize_title_band_container.querySelector('h2.t2');
    band.style.lineHeight = '30px';
    band.style.marginBottom = '15px';
    header.insertBefore(band, header.firstChild);
    header.insertBefore(title, header.firstChild);
    header.removeChild(optimize_title_band_container);



}

const getTargetChord = (id) => document.querySelector(`div[data-id="${id}"]`);

const buildChordsSectionOverMenuExtension = () => {

    const buildChordsReferenceListBasedOnItsNames = () => {

        const chords_info = Array.from(document.querySelectorAll('.cifra_acordes'));
        if(!chords_info){
            return [];
        }
    
        return Array.from(chords_info.map(item => item.querySelectorAll('div.chord'))).flatMap(list => {
            return Array.from(list).map(chord_info => {
                const chordName = chord_info.querySelector('strong').textContent;
               
               chord_info.dataset.id=chordName;
               const id = chordName;
               //TODO: transform id special characters to its related name based on chord notations: https://en.wikipedia.org/wiki/Chord_notation
        
               return {
                id,
                chordName,
               }
            });
            
        })
    
        
    }
    
    const chordsReferenceList = buildChordsReferenceListBasedOnItsNames();

const chordsListDiv = document.querySelector('ul#chords');

chordsReferenceList.forEach(chord => {

    const targetChord = getTargetChord(chord.id);

    /* Chord Title Section */

    const displayChordInput = document.createElement('input');
    displayChordInput.setAttribute('type', 'checkbox');
    displayChordInput.setAttribute('checked', targetChord.style.display !== 'none');
    displayChordInput.setAttribute('id', `${chord.id}-display-input`);
    displayChordInput.addEventListener('change', (ev) =>  {
        
        const shouldDisplayChord = ev.target.checked;
        ev.target.setAttribute('checked', shouldDisplayChord);
        if(targetChord)
        {            
            if (shouldDisplayChord) 
            {
                targetChord.parentNode.style.display = 'inline-block';
            } else 
                {
                    targetChord.parentNode.style.display = 'none';
                }
        }
    
    })

    const chordName = document.createElement('label');
    chordName.setAttribute('for', `${chord.id}-display-input`);
    chordName.appendChild(document.createTextNode(chord.chordName));
    chordName.style.fontWeight = 'bold';

    const chordTitleContainer = document.createElement('span');
    chordTitleContainer.classList.add('inp_opt');
    chordTitleContainer.classList.add('small');
    chordTitleContainer.style.marginBottom = '5px';
    chordTitleContainer.appendChild(displayChordInput);
    chordTitleContainer.appendChild(chordName);

    /* End Chord Title Section */

    /* Override Chord Name Section */

    const overrideChordNameContainer = document.createElement('span');
    overrideChordNameContainer.classList.add('inp_opt');
    overrideChordNameContainer.classList.add('small');
    overrideChordNameContainer.style.marginBottom='25px'

    const overrideChordNameLabel = document.createElement('label');
    overrideChordNameLabel.setAttribute('for', `override-name`);
    overrideChordNameLabel.style.paddingLeft='0';
    overrideChordNameLabel.appendChild(document.createTextNode('override name:'));

    const overrideChordNameInput = document.createElement('input');
    overrideChordNameInput.setAttribute('id', `override-name`);
    overrideChordNameInput.setAttribute('type', `text`);
    overrideChordNameInput.setAttribute('size', `10`);
    overrideChordNameInput.setAttribute('display', `block`);
    overrideChordNameInput.setAttribute('placeholder',chord.chordName);
    overrideChordNameInput.style.margin='4px 0 2px 0';
    overrideChordNameInput.style.opacity=1;
    overrideChordNameInput.style.border='1px solid black';
    overrideChordNameInput.addEventListener('input', (ev) => {
        
        let chordTitle = targetChord.querySelector('strong');
        chordTitle.textContent = ev.target.value?.trim() || chord.chordName;
        
    })

    overrideChordNameContainer.appendChild(overrideChordNameLabel);
    overrideChordNameContainer.appendChild(document.createElement('br'));
    overrideChordNameContainer.appendChild(overrideChordNameInput);

    /* End Override Chord Name Section */

    /* Chord Position Section */

        const displayChordPositionInput = document.createElement('input');
        displayChordPositionInput.setAttribute('type', 'checkbox');
        displayChordPositionInput.setAttribute('checked', 'true');
        displayChordPositionInput.setAttribute('id', `${chord.id}-display-position-input`);
        displayChordPositionInput.addEventListener('change', (ev) =>  {
            
            const shouldDisplayChordPosition = ev.target.checked;
            ev.target.setAttribute('checked', shouldDisplayChordPosition);
            if(targetChord)
            {   
                let chordPositionNoteList = Array.from(targetChord.querySelectorAll('div.chord-grid span.chord-note')) || [];
                let chordPositionBarList = Array.from(targetChord.querySelectorAll('div.chord-grid span.chord-bar')) || [];
                let chordPositionFretList = Array.from(targetChord.querySelectorAll('div.chord-grid span.chord-fret')) || [];
                

                let chordPositionList = chordPositionNoteList.concat(chordPositionBarList, chordPositionFretList);


                if (shouldDisplayChordPosition) 
                {
                    chordPositionList.forEach((posItem) => {
                        posItem.style.display = 'block';
                    })
                } else 
                    {
                        chordPositionList?.forEach((posItem) => {
                            posItem.style.display = 'none';
                        })  
                    }
            }
        
        })
    
        const chordPositionLabel = document.createElement('label');
        chordPositionLabel.setAttribute('for', `${chord.id}-display-position-input`);
        chordPositionLabel.appendChild(document.createTextNode(`display chord-position`));
        
    
        const chordPositionContainer = document.createElement('span');
        chordPositionContainer.classList.add('inp_opt');
        chordPositionContainer.classList.add('small');
        chordPositionContainer.style.marginBottom = '8px';
        chordPositionContainer.appendChild(displayChordPositionInput);
        chordPositionContainer.appendChild(chordPositionLabel);
    
    /* End Chord Position Section */

    /* Override Description Section */
    let targetChordDescriptionContainer = targetChord.querySelector('small');
    if(!targetChordDescriptionContainer){
        targetChordDescriptionContainer = document.createElement('small');
        targetChordDescriptionContainer.style.display = 'none';
        targetChord.appendChild(targetChordDescriptionContainer);
    }
    const overrideDescriptionContainer = document.createElement('span');

    overrideDescriptionContainer.classList.add('inp_opt');
    overrideDescriptionContainer.classList.add('small');
    overrideDescriptionContainer.style.marginBottom='25px'

    const overrideDescriptionLabel = document.createElement('label');
    overrideDescriptionLabel.setAttribute('for', `override-description`);
    overrideDescriptionLabel.style.paddingLeft='0';
    overrideDescriptionLabel.appendChild(document.createTextNode('description:'));

    const overrideDescriptionInput = document.createElement('input');
    overrideDescriptionInput.setAttribute('id', `override-description`);
    overrideDescriptionInput.setAttribute('type', `text`);
    overrideDescriptionInput.setAttribute('size', `1`);
    overrideDescriptionInput.setAttribute('display', `block`);
    
    overrideDescriptionInput.setAttribute('placeholder',targetChordDescriptionContainer?.textContent || '');
    overrideDescriptionInput.setAttribute('value',targetChordDescriptionContainer?.textContent || '');
    overrideDescriptionInput.style.margin='4px 0 2px 0';
    overrideDescriptionInput.style.opacity=1;
    overrideDescriptionInput.style.border='1px solid black';
    overrideDescriptionInput.addEventListener('input', (ev) => {
        
        let description = ev.target.value;
        if(description){
            targetChordDescriptionContainer.style.display = 'block';
            targetChordDescriptionContainer.textContent = `${description}`;
        }
        else {
            targetChordDescriptionContainer.style.display = 'none';
        }
        
    })

    overrideDescriptionContainer.appendChild(overrideDescriptionLabel);
    overrideDescriptionContainer.appendChild(document.createElement('br'));
    overrideDescriptionContainer.appendChild(overrideDescriptionInput);

   

    /*End Override Description Section*/

    /* Binding sections */
    const chordItem = document.createElement('li');    
    chordItem.dataset.id=chord.id;
    chordItem.appendChild(chordTitleContainer);
    chordItem.appendChild(document.createElement('br'));
    chordItem.appendChild(overrideChordNameContainer);
    chordItem.appendChild(document.createElement('br'));
    chordItem.appendChild(chordPositionContainer);
    if(targetChordDescriptionContainer){
        chordItem.appendChild(document.createElement('br'));
        chordItem.appendChild(overrideDescriptionContainer);
    }


    chordsListDiv.appendChild(chordItem);
    chordsListDiv.appendChild(document.createElement('hr'));

    /*End Binding Sections*/
});

}

buildChordsSectionOverMenuExtension();
displayTargetElement(logo, logo_button_ext.checked);
displayTargetElement(compositor, compositor_button_ext.checked);
    
})