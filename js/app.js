var app = function(){
	var selfApp = this;
	this.allWords = [];
	var timeItl = undefined;
	this.nextOne = function(id){
		this.updateWord("#word_" + id);			
		this.updateScore("#score_"+id, "add");
	};

	this.stepOver = function(id){
		this.updateWord("#word_"+ id);
	};

	this.restart = function(){
		try{
			clearInterval(timeItl);
		}catch(e){
		}
		var ids = ["left", "right"];	
		for(var i = 0 ;i < ids.length;i ++){
			this.updateScore("#score_" + ids[i], "init");
			this.updateWord("#word_" + ids[i]);
		}
		this.startTime();
		this.toggleBtnActive(true);
	};

	this.startTime = function(){
		this.updateTime("init");
		timeItl = setInterval(function(){
			selfApp.updateTime("dec");	
		}, 1000);	
	};

	this.updateTime = function(act){
		if(act === "init")
			$("#time").html((Config.totalTime).toString());
		else if(act === "dec"){
			$("#time").html((parseInt($("#time").html()) - 1).toString());
			if (parseInt($("#time").html()) === 0){
					clearInterval(timeItl);
					this.toggleBtnActive(false);
			}
		}	
	};

	this.updateScore = function(id, act){
		if (act === "init"){
			$(id).html("0");	
		}else if(act === "add"){
			$(id).html((parseInt($(id).html()) + 1).toString());	
		}
	};

	this.updateWord = function(id){
		this.dtd = $.Deferred();
		this.getNextRandomWord();
		$.when(this.dtd)
			.done(function(){
				$(id).html(selfApp.currW);
			})
			.fail(function(){
				$(id).html("No More Word");
			});
	};

	this.getNextRandomWord = function(){
		var length = this.allWords.length;
		var isFind = false;
		var isFull = false;
		var ret = undefined;
		
		var getWord = function(){
			var w = this.allWords[Math.floor(Math.random() * length)];
			var dtd = $.Deferred();
			Lawnchair(function(){ 	
					this.get("alreadynum", function(la){
						if(la.value === length){
						   	isFull = true;	
							selfApp.toggleBtnActive(false);
						}
						this.exists(w, function(isExists){
							if (!isExists){
								this.save({
									key:w,
									value:w
								});// �洢��cookie��
								this.save({
									key:"alreadynum",
									value:la.value + 1
								});
								isFind = true;
							}
							dtd.resolve();
						});	

					});
				});
			
			$.when(dtd)
			.done(function(){
				if(isFind){
					selfApp.currW = w;	
					selfApp.dtd.resolve();
				}
				if(isFull){
					selfApp.currW = undefined;
					selfApp.dtd.reject();
				}
				if(!isFind && !isFull){
					getWord();
				}
			})
			.fail(function(){
				;	
			});
		};	
		getWord();
	};
	
	this.toggleBtnActive = function(isActive){
		var btns = ["nextone_btn_left", "nextone_btn_right", "stepover_btn_left", "stepover_btn_right"];
			
		for (var i = 0; i < btns.length; i ++){
			$("#" + btns[i]).attr('disabled',!isActive); 
		}	
	};
	this.init = function(){
		$("#nextone_btn_left").click(function(){
			selfApp.nextOne("left");
		});

		$("#nextone_btn_right").click(function(){
			selfApp.nextOne("right");
		});

		$("#stepover_btn_left").click(function(){
			selfApp.stepOver("left");
		});

		$("#stepover_btn_right").click(function(){
			selfApp.stepOver("right");
		});

		$("#start_btn").click(function(){
			selfApp.restart();
		});
		
		$("#time").html(Config.totalTime.toString());
		this.toggleBtnActive(false);
		if(!Config.noRepeated) {
			//���cookie�е�����	
			Lawnchair(function(){
						this.nuke();
					}); 
		}

		Lawnchair(function(){
			this.exists("alreadynum", function(isExisted){
				if(!isExisted){	
					this.save({
						key:"alreadynum",
						value:0
					});
				}
			});
		});

		this.allWords = [
"Ϳ��ë��",
"����",
"�����",
"����",
"������ӡ",
"�±�",
"��ţ",
"û��û��",
"�����",
"Ģ��",
"������",
"����",
"��Ŀ����",
"һ�ϲ�ͨ",
"�绰",
"��������",
"ץ������",
"ľ��",
"����",
"�ƻ���ľ",
"��ɮ",
"����ʮ��",
"����������",
"ˮ䰴�",
"̩ɽ",
"��ɽ",
"����",
"ӥ����",
"��ˮ",
"ϲ����",
"���",
"����",
"��",
"����",
"��ȫñ",
"ü����ȥ",
"ţ��֯Ů",
"������",
"����",
"����",
"��������",
"����",
"����ĺ�",
"΢��¯",
"������",
"��",
"����",
"�캮�ض�",
"ϴ�·�",
"���",
"���",
"�վ���",
"���Ķ���",
"���˼��",
"ţħ��",
"�ż�����",
"�����ķ�",
"����ƨ",
"����",
"�����μǡ�",
"�ù�",
"����Ӣ",
"Ŀ������",
"���",
"�ŵ�����",
"���",
"ͬ������",
"���ɿ���",
"ĵ����",
"���Ļ�",
"ɽ��",
"����",
"S��",
"�Ͼ���",
"������Ϊ",
"��������",
"ͬ�ʹ���",
"ɽ��ˮ��",
"����",
"�ٵ�",
"�Ǳ�Ϊ��",
"��������",
"�Ա���",
"�Ĵ���Ů",
"ͷ�ؽ���",
"����һ��",
"һ�����һ���",
"��ɽ��",
"�ϴ�����",
"����",
"����",
"����",
"��ˮ",
"��������",
"��å",
"��������",
"С����",
"ѩ��",
"���ҿ���",
"�����",
"����",
"����",
"��������",
"��ɫ",
"��Ͳ",
"���Ĺ�",
"��ն��",
"����",
"ä������",
"��ɽ",
"����",
"�Ա��˳���û�¸�",
"ʨ��",
"�ƺ�",
"ʥ����",
"�¹�����",
"��Ǯ",
"�ܻ���",
"���뻢��",
"ң����",
"ө���",
"��������",
"ϲ����",
"���ı�",
"����",
"���",
"���",
"���춯��",
"����",
"��Ӭ",
"ǧɽ��ˮ",
"�۷�",
"÷��",
"�ֵ�Ͳ",
"�з",
"�۹���",
"ţ��",
"�޹�",
"ҧ���г�",
"����",
"����",
"��ݾ���",
"ռ��",
"Ҧ��",
"���Ų���һ��",
"����",
"����",
"һ������",
"�����ĵ�",
"����",
"�������ֺ�",
"��Ҷ",
"�緹��",
"Ы��",
"������",
"����¥�Ρ� ��ˮ",
"̸����",
"������",
"��Ӿ",
"��̫��",
"����",
"����",
"��������",
"��̳��",
"�㽶",
"����",
"���ϴ�",
"����",
"����˫��",
"���߲嵶",
"����",
"������",
"����",
"������",
"����һ����",
"����",
"����������ü",
"��Ǯ��",
"һ������",
"����",
"�٤",
"�о���",
"һȳһ��",
"ü����Ц",
"����",
"����",
"�������",
"����",
"������ɫ",
"б��",
"�д�",
"����",
"��ɽ��ţ",
"����",
"��������",
"��нˮ",
"��������",
"ĸ��",
"����Ů��",
"���ܹ�",
"��к",
"ӣ��С��",
"����",
"��ʮ��Ц�ٲ�",
"���¾㱸",
"����",
"����¥�Ρ�",
"���ް�",
"��",
"������ɫ",
"����",
"�Ա�ɽ",
"����",
"����",
"�ܽ���",
"�ϵذ�",
"�������",
"���ϰ���",
"�Ȳ�",
"QQ",
"�Ͷ���",
"����",
"�߽�",
"��ˮ",
"������̾",
"�����޼�",
"�ں�",
"��������",
"����",
"�ֻ�",
"һ�����ٶ���",
"һĿ��Ȼ",
"������",
"��Ů",
"��������",
"�һ�",
"��ʱ��",
"���ɹ���",
"����ͦ��",
"���ƽ�",
"ë��",
"��������",
"����",
"����",
"�ҵ���",
"������",
"����",
"����Ǯ",
"�����",
"����",
"�̲�",
"������",
"ʹ������",
"����",
"�����",
"������",
"������Ϭһ��ͨ",
"�����",
"���ӻ�",
"��Ȼ����",
"�ץ������",
"ɨ��",
"��ӡˢ",
"��ţƤ",
"�����г�",
"����",
"����",
"����",
"ɫ��",
"���޹�",
"������",
"��ͷ�ڹ�",
"˫��Ƥ",
"������",
"����",
"��С��",
"���",
"��ʩЧ�",
"ι��",
"�׶�԰",
"����",
"ϴ��",
"��������",
"�ٶ�",
"���̻���",
"ѹ����",
"����",
"���ӵ绰",
"�ֲ�",
"������",
"ָ�ֻ���",
"����",
"ӣ��",
"�°���",
"����ע��",
"������Ц",
"����",
"һ��һʮ",
"������",
"������ȫ",
"���",
"�����ﲨ",
"�Բ��˶�����",
"�Ұ������",
"�ڶ�����",
"������Ѽ",
"����",
"������",
"ʮȫʮ��",
"����",
"��ͷ",
"����Ӣ",
"�չ�Ƽ�����",
"ˮ��ʯ��",
"����",
"����",
"��ë��",
"ָ����",
"��ţ̸��",
"��������",
"���Ⱦ���",
"һ������",
"�㶹",
"��Ŀһ��",
"Χ��������",
"���»�",
"�����ȷ�",
"��������",
"�߱���",
"����",
"�������",
"�ŷ�",
"���ɹ���",
"��Ͱ",
"�ٺϻ�",
"������",
"â��",
"ǰ������",
"ҽԺ",
"�����",
"СƷ",
"Χȹ",
"����",
"�������¼�",
"����",
"����",
"��ͷɥ��",
"���",
"�Բ�����",
"�¶ȼ�",
"��������",
"Լ��",
"�򳪸���",
"�Խ���",
"����",
"��̫��",
"��ѻ",
"����",
"���˰���",
"ˤ��",
"��˽",
"�����㵸",
"ƤЦ�ⲻЦ",
"��Ь",
"��������",
"�ε�",
"��������",
"���ִ��",
"������ǽ",
"��ҡ���",
"����˽",
"�̻Ҹ�",
"�Ϳ�",
"ɹ�·�",
"�²�",
"���",
"����",
"��֦��չ",
"˿��",
"����",
"��ˮ䰴���",
"�ʻ�����ţ����",
"����",
"��ƿ",
"ҹݺ",
"����",
"ˮ��ͷ",
"���",
"���",
"����",
"���",
"ܽ�ؽ��",
"һ��˫��",
"��Ŀ��",
"��Բ",
"����",
"�Ļ�ɴ��",
"��ɽ",
"�콱��",
"�и�װ",
"����",
"����",
"�ɰ���",
"ƻ��",
"��ɽ",
"������",
"͵��",
"����",
"Ħ�г�",
"��ױ̨",
"����",
"��֦",
"ħ��",
"����",
"ͷ����׶�̹�",
"Ұ��",
"��ͷ����",
"����",
"����",
"���̶�",
"˧����",
"��æ����",
"ơ��",
"���Ѿ�",
"һ��һ��",
"����",
"��ɽ����",
"���",
"Ԫ����",
"��ʪ",
"����",
"�Ź����",
"�ϻ�",
"���齫",
"��ƤЦ��",
"��˽䱳ϱ��",
"���ȿֺ�",
"��è",
"�������",
"��������",
"̹��",
"����",
"�յ�",
"����",
"���˽�",
"һ������",
"���������塷",
"������",
"��˷",
"������",
"����",
"��������"
				];
	};

	this.init();

}();
