
class ImageGroup{
    constructor(group,g,id){
        this._createImage = this._createImage.bind(this);
        this._groupate = this._groupate.bind(this);
        this.getFig = this.getFig.bind(this);
        this._move = this._move.bind(this);
        this._showFather = this._showFather.bind(this);
        this.select = this.select.bind(this);
        this.selecting = this.selecting.bind(this);
        this.getSelected = this.getSelected.bind(this);
        this._createId = this._createId.bind(this);
        if(group !== undefined){
            this.group = group;
            this.secondary = true;
            this.fig = g;
            this.father = null;
            Movel.area.appendChild(this.fig);
            this.selected = true;
            this.id = id;
        } else{
            this.group = [];
            this.secondary = false;
            Movel.area = document.createElementNS(SVG, "svg");
            MessageBus.ext.subscribe("control/create",this._createImage);
            MessageBus.ext.subscribe("control/group",this._groupate);
            Movel.area.setAttribute("id", "canvas");
            Movel.area.setAttribute("width", "100%");
            Movel.area.setAttribute("height", "100%");
            let div = document.querySelector(".main");
            div.appendChild(Movel.area);
            console.log(this.group);
            console.log("aaaa\n");
            this.groupated = true;
            this.father = null;
            this.selected = false;
        }
        
    }
    _createImage() {
        let select = document.querySelector("#choice");
        let chosen = select.selectedIndex;
        //console.log(select.selectedIndex);
        let options = select.options;
        let optionChosen;
        if(chosen !== undefined)
            optionChosen = options[chosen];
        //console.log(optionChosen.getAttribute("value"));
        let square = new Movel(optionChosen.getAttribute("value"),this._createId());
        this.group.push(square);
        console.log(this.group);
        console.log("batata frita");
    }
    _groupate(){
        let newGroup = [];
        let newGroupOb;
        let id = this._createId()
        let g = document.createElementNS(SVG,"g");
        g.setAttribute("id", id)
        g.setAttribute("class","group");
        for (let i = 0; i < this.group.length;){
            if (((this.group)[i]).selected){
               let removed = this.group.splice(i,1);
               removed[0].groupated = true;
               //console.log(removed[0]);
               g.appendChild(removed[0].getFig());
               newGroup.push(removed[0]);
               i--;
            }
            i++;
        }
        Movel.area.appendChild(g);
        newGroupOb = new ImageGroup(newGroup,g,id);
        this._showFather(newGroupOb);
        console.log(newGroupOb);
        this.group.push(newGroupOb);
        console.log(this.group);
    }
    _move(x,y){
        let xProp;
        if(this.father !== null){
            this.father._move(x,y);
        } else{
            console.log(this);
            console.log("feijão");
            let transform = this.fig.getAttribute("transform");
            console.log(transform);
            if(transform){
                if(transform[0] === "s"){
                    this.fig.setAttribute("transform","translate(" + (x) + "," + (y) + ") " + transform);
                }else{
                    let vari = transform.split(" ");
                    if(vari.length > 1){
                        this.fig.setAttribute("transform","translate(" + (x) + "," + (y) + ") " + vari[1]);
                    }else{
                        this.fig.setAttribute("transform","translate(" + (x) + "," + (y) + ")");
                    }
                }
            }else{
                this.fig.setAttribute("transform","translate(" + (x) + "," + (y) + ")");
            }
        }
    }
    getFig(){
        return this.fig;
    }
    _showFather(group){
        for(let i = 0; i < group.group.length; i++){
            (group.group[i]).father = group;
        }
    }
    select(){
        if(this.father !== null){
            this.father.select();
            this.selected = !(this.selected);
        }else{
            this.selected = !(this.selected);
            for(let i = 0; i < this.group.length;i++){
                (this.group[i]).selecting();
            }
        }
    }
    selecting(){
        for(let i = 0; i < this.group.length;i++){
            (this.group[i]).selecting();
        }
    }
    grow(xProp,yProp,num){
        let x;
        let y;
        if(this.father !== null){
            this.father.grow(xProp,yProp,num);
        }else{
            let transform = this.fig.getAttribute("transform");
            console.log(transform);
            if(transform){
                if(transform[0] === "s"){
                    this.fig.setAttribute("transform","scale("+ xProp + "," + yProp+")");
                }else{
                    let str = transform.split(" ");
                    this.fig.setAttribute("transform",str[0] + " scale("+ xProp + "," + yProp+")");
                }
            }else{
                this.fig.setAttribute("transform","scale("+ xProp + "," + yProp+")");
            }
        }
    }
    getSelected(){
        let selected = [];
        //console.log(this.group);
        for(let i = 0; i < this.group.length;i++){
            let fig = this.group[i];
            if (fig !== undefined){
                if (fig.selected){
                    selected.push(this.group[i]);
                }
            }
            //console.log("estou num loop infinito");
        }
        //console.log(selected);
        return selected
    }
    _createId(){
        let d = new Date();
        let dia = d.getDay().toString();
        let mes = d.getMonth().toString();
        let ano = d.getYear().toString();
        let h = d.getHours().toString();
        let m = d.getMinutes().toString();
        let s = d.getSeconds().toString();
        let chave = Math.floor(Math.random() * (9000 - 1 + 1)) + 1;
        let strchave = dia + mes + h + m + s + chave.toString();
        return strchave
    }
}