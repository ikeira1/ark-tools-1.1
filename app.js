let currentActiveConfigType = 'usersettings';

const arkConfigs = {
    usersettings: {
        title: "GameUserSettings.ini",
        description: "إعدادات السيرفر والصعوبة والتحكم الكامل",
        headerTag: "[ServerSettings]",
        settings: [
            { key: "ActiveMods", default: "", label: "ActiveMods", desc: "المودات المفعلة في السيرفر." },
            { key: "ActiveMapMod", default: "", label: "ActiveMapMod", desc: "مود الخريطة المفعل." },
            { key: "AdminLogging", default: "false", label: "AdminLogging", desc: "تسجيل أنشطة الأدمن." },
            { key: "AllowAnyoneBabyImprintCuddle", default: "false", label: "AllowAnyoneBabyImprintCuddle", desc: "السماح لأي شخص بالاعتناء بصغار الديناصورات." },
            { key: "AllowCaveBuildingPvE", default: "false", label: "AllowCaveBuildingPvE", desc: "السماح بالبناء داخل الكهوف في وضع PvE." },
            { key: "AllowCaveBuildingPvP", default: "true", label: "AllowCaveBuildingPvP", desc: "السماح بالبناء داخل الكهوف في وضع PvP." },
            { key: "AllowCryoFridgeOnSaddle", default: "false", label: "AllowCryoFridgeOnSaddle", desc: "السماح بوضع ثلاجة الكرايو على السسرج." },
            { key: "AllowFlyerCarryPvE", default: "false", label: "AllowFlyerCarryPvE", desc: "السماح للديناصورات الطائرة بحمل الكائنات في PvE." },
            { key: "AllowHideDamageSourceFromLogs", default: "true", label: "AllowHideDamageSourceFromLogs", desc: "إخفاء مصادر الضرر من السجلات." },
            { key: "AllowHitMarkers", default: "true", label: "AllowHitMarkers", desc: "إظهار علامة الإصابة عند ضرب الأهداف." },
            { key: "AllowMultipleAttachedC4", default: "false", label: "AllowMultipleAttachedC4", desc: "السماح بلصق عدة حبات C4 معاً." },
            { key: "AllowRaidDinoFeeding", default: "false", label: "AllowRaidDinoFeeding", desc: "السماح بإطعام ديناصورات الريد." },
            { key: "AllowThirdPersonPlayer", default: "true", label: "AllowThirdPersonPlayer", desc: "السماح بمنظور الكاميرا الثالثة للاعب." },
            { key: "AlwaysAllowStructurePickup", default: "false", label: "AlwaysAllowStructurePickup", desc: "السماح بالتقاط الهياكل والبناء في أي وقت." },
            { key: "ArmadoggoDeathCooldown", default: "3600", label: "ArmadoggoDeathCooldown", desc: "فترة انتظار إعادة ظهور الأرمادوجو بعد الموت." },
            { key: "AutoSavePeriodMinutes", default: "15.0", label: "AutoSavePeriodMinutes", desc: "الفترة الزمنية بالدقائق للحفظ التلقائي." },
            { key: "BanListURL", default: "https://cdn2.arkdedicated.com/asa/BanList.txt", label: "BanListURL", desc: "رابط قائمة المحظورين." },
            { key: "ClampItemSpoilingTimes", default: "false", label: "ClampItemSpoilingTimes", desc: "تحديد وقت فساد العناصر." },
            { key: "ClampResourceHarvestDamage", default: "false", label: "ClampResourceHarvestDamage", desc: "تحديد ضرر حصاد الموارد." },
            { key: "CosmeticWhitelistOverride", default: "", label: "CosmeticWhitelistOverride", desc: "تجاوز القائمة البيضاء للتجميليات." },
            { key: "CosmoWeaponAmmoReloadAmount", default: "1", label: "CosmoWeaponAmmoReloadAmount", desc: "كمية تعبئة ذخيرة سلاح الكوزمو." },
            { key: "CustomLiveTuningUrl", default: "", label: "CustomLiveTuningUrl", desc: "رابط التعديل المباشر المخصص." },
            { key: "DayCycleSpeedScale", default: "1.0", label: "DayCycleSpeedScale", desc: "سرعة دورة اليوم." },
            { key: "DayTimeSpeedScale", default: "1.0", label: "DayTimeSpeedScale", desc: "سرعة وقت النهار." },
            { key: "DifficultyOffset", default: "1.0", label: "DifficultyOffset", desc: "معامل صعوبة السيرفر." },
            { key: "DinoCharacterFoodDrainMultiplier", default: "1.0", label: "DinoCharacterFoodDrainMultiplier", desc: "معدل استهلاك طعام الديناصورات." },
            { key: "DinoCharacterHealthRecoveryMultiplier", default: "1.0", label: "DinoCharacterHealthRecoveryMultiplier", desc: "معدل استشفاء صحة الديناصورات." },
            { key: "DinoCharacterStaminaDrainMultiplier", default: "1.0", label: "DinoCharacterStaminaDrainMultiplier", desc: "معدل استهلاك طاقة الديناصورات." },
            { key: "DinoDamageMultiplier", default: "1.0", label: "DinoDamageMultiplier", desc: "مضاعف ضرر الديناصورات." },
            { key: "DinoResistanceMultiplier", default: "1.0", label: "DinoResistanceMultiplier", desc: "مضاعف مقاومة الديناصورات للضرر." },
            { key: "DestroyTamesOverTheSoftTameLimit", default: "false", label: "DestroyTamesOverTheSoftTameLimit", desc: "تدمير المروضات التي تتجاوز الحد المرن." },
            { key: "DisableCryopodEnemyCheck", default: "false", label: "DisableCryopodEnemyCheck", desc: "تعطيل فحص الأعداء للكريوبود." },
            { key: "DisableCryopodFridgeRequirement", default: "false", label: "DisableCryopodFridgeRequirement", desc: "تعطيل شرط الثلاجة للكريوبود." },
            { key: "DisableDinoDecayPvE", default: "false", label: "DisableDinoDecayPvE", desc: "تعطيل تحلل الديناصورات في PvE." },
            { key: "DisableImprintDinoBuff", default: "false", label: "DisableImprintDinoBuff", desc: "تعطيل بوف الإمبرنت للديناصورات." },
            { key: "DisablePvEGamma", default: "false", label: "DisablePvEGamma", desc: "تعطيل تعديل الجاما في PvE." },
            { key: "DisableStructureDecayPvE", default: "false", label: "DisableStructureDecayPvE", desc: "تعطيل تحلل الهياكل في PvE." },
            { key: "DisableWeatherFog", default: "false", label: "DisableWeatherFog", desc: "تعطيل ضباب الطقس." },
            { key: "DontAlwaysNotifyPlayerJoined", default: "false", label: "DontAlwaysNotifyPlayerJoined", desc: "عدم إرسال إشعار دائم بدخول اللاعبين." },
            { key: "EnableExtraStructurePreventionVolumes", default: "false", label: "EnableExtraStructurePreventionVolumes", desc: "تفعيل حجوزات منع البناء الإضافية." },
            { key: "EnablePvPGamma", default: "false", label: "EnablePvPGamma", desc: "تفعيل تعديل الجاما في PvP." },
            { key: "ForceAllStructureLocking", default: "false", label: "ForceAllStructureLocking", desc: "فرض قفل جميع الهياكل." },
            { key: "ForceGachaUnhappyInCaves", default: "true", label: "ForceGachaUnhappyInCaves", desc: "إجبار الغاتشا على أن يكون تعيسًا داخل الكهوف." },
            { key: "globalVoiceChat", default: "false", label: "globalVoiceChat", desc: "تفعيل الدردشة الصوتية العامة." },
            { key: "HarvestAmountMultiplier", default: "1.0", label: "HarvestAmountMultiplier", desc: "مضاعف كمية الحصاد." },
            { key: "HarvestHealthMultiplier", default: "1.0", label: "HarvestHealthMultiplier", desc: "مضاعف صحة موارد الحصاد." },
            { key: "IgnoreLimitMaxStructuresInRangeTypeFlag", default: "false", label: "IgnoreLimitMaxStructuresInRangeTypeFlag", desc: "تجاهل علم الحد الأقصى للهياكل في النطاق." },
            { key: "ImplantSuicideCD", default: "28800", label: "ImplantSuicideCD", desc: "فترة الانتظار للانتحار عبر الشريحة." },
            { key: "ItemStackSizeMultiplier", default: "1.0", label: "ItemStackSizeMultiplier", desc: "مضاعف حجم تكديس العناصر." },
            { key: "KickIdlePlayersPeriod", default: "3600.0", label: "KickIdlePlayersPeriod", desc: "مدة طرد اللاعبين الخاملين." },
            { key: "MaxCosmoWeaponAmmo", default: "-1", label: "MaxCosmoWeaponAmmo", desc: "الحد الأقصى لذخيرة سلاح كوزمو." },
            { key: "MaxPersonalTamedDinos", default: "0", label: "MaxPersonalTamedDinos", desc: "الحد الأقصى للديناصورات المروضة شخصياً." },
            { key: "MaxTamedDinos", default: "5000.0", label: "MaxTamedDinos", desc: "الحد الأقصى العام للديناصورات المروضة." },
            { key: "MaxTamedDinos_SoftTameLimit", default: "5000", label: "MaxTamedDinos_SoftTameLimit", desc: "الحد المرن للديناصورات المروضة." },
            { key: "MaxTamedDinos_SoftTameLimit_CountdownForDeletionDuration", default: "604800", label: "MaxTamedDinos_SoftTameLimit_CountdownForDeletionDuration", desc: "عداد مدة الحذف لتجاوز الحد المرن." },
            { key: "MaxTrainCars", default: "8", label: "MaxTrainCars", desc: "الحد الأقصى لعربات القطار." },
            { key: "MaxTributeDinos", default: "20", label: "MaxTributeDinos", desc: "الحد الأقصى لديناصورات الجزية (التريبيوت)." },
            { key: "MaxTributeItems", default: "50", label: "MaxTributeItems", desc: "الحد الأقصى لعناصر الجزية." },
            { key: "NightTimeSpeedScale", default: "1.0", label: "NightTimeSpeedScale", desc: "سرعة وقت الليل." },
            { key: "NonPermanentDiseases", default: "false", label: "NonPermanentDiseases", desc: "جعل الأمراض غير دائمية." },
            { key: "OverrideOfficialDifficulty", default: "0.0", label: "OverrideOfficialDifficulty", desc: "تجاوز الصعوبة الرسمية." },
            { key: "OverrideStructurePlatformPrevention", default: "false", label: "OverrideStructurePlatformPrevention", desc: "تجاوز منع بناء المنصات." },
            { key: "OxygenSwimSpeedStatMultiplier", default: "1.0", label: "OxygenSwimSpeedStatMultiplier", desc: "مضاعف سرعة السباحة بالأكسجين." },
            { key: "PerPlatformMaxStructuresMultiplier", default: "1.0", label: "PerPlatformMaxStructuresMultiplier", desc: "مضاعف الحد الأقص للهياكل لكل منصة." },
            { key: "PlatformSaddleBuildAreaBoundsMultiplier", default: "1.0", label: "PlatformSaddleBuildAreaBoundsMultiplier", desc: "مضاعف مساحة البناء على سرج المنصة." },
            { key: "PlayerCharacterFoodDrainMultiplier", default: "1.0", label: "PlayerCharacterFoodDrainMultiplier", desc: "معدل استهلاك طعام اللاعب." },
            { key: "PlayerCharacterHealthRecoveryMultiplier", default: "1.0", label: "PlayerCharacterHealthRecoveryMultiplier", desc: "معدل استشفاء صحة اللاعب." },
            { key: "PlayerCharacterStaminaDrainMultiplier", default: "1.0", label: "PlayerCharacterStaminaDrainMultiplier", desc: "معدل استهلاك طاقة اللاعب." },
            { key: "PlayerCharacterWaterDrainMultiplier", default: "1.0", label: "PlayerCharacterWaterDrainMultiplier", desc: "معدل استهلاك ماء اللاعب." },
            { key: "PlayerDamageMultiplier", default: "1.0", label: "PlayerDamageMultiplier", desc: "مضاعف ضرر اللاعب." },
            { key: "PlayerResistanceMultiplier", default: "1.0", label: "PlayerResistanceMultiplier", desc: "مضاعف مقاومة اللاعب." },
            { key: "PreventDiseases", default: "false", label: "PreventDiseases", desc: "منع انتشار الأمراض." },
            { key: "PreventMateBoost", default: "false", label: "PreventMateBoost", desc: "منع بوف التزاوج." },
            { key: "PreventOfflinePvP", default: "false", label: "PreventOfflinePvP", desc: "منع الـ PvP أثناء غياب اللاعب (أوفلاين)." },
            { key: "PreventOfflinePvPInterval", default: "0.0", label: "PreventOfflinePvPInterval", desc: "فترة تفعيل حماية الأوفلاين." },
            { key: "PreventSpawnAnimations", default: "false", label: "PreventSpawnAnimations", desc: "منع حركات الظهور عند السباون." },
            { key: "PreventTribeAlliances", default: "false", label: "PreventTribeAlliances", desc: "منع تحالفات القبائل." },
            { key: "ProximityChat", default: "false", label: "ProximityChat", desc: "تفعيل الدردشة القريبة (المكانية)." },
            { key: "PvEAllowStructuresAtSupplyDrops", default: "false", label: "PvEAllowStructuresAtSupplyDrops", desc: "السماح بالبناء بجانب الدروبات في PvE." },
            { key: "PvEDinoDecayPeriodMultiplier", default: "1.0", label: "PvEDinoDecayPeriodMultiplier", desc: "مضاعف فترة تحلل ديناصورات PvE." },
            { key: "PvPDinoDecay", default: "false", label: "PvPDinoDecay", desc: "تفعيل تحلل ديناصورات PvP." },
            { key: "RaidDinoCharacterFoodDrainMultiplier", default: "1.0", label: "RaidDinoCharacterFoodDrainMultiplier", desc: "معدل استهلاك طعام ديناصورات الريد." },
            { key: "RandomSupplyCratePoints", default: "false", label: "RandomSupplyCratePoints", desc: "نقاط دروبات الإمداد العشوائية." },
            { key: "RCONEnabled", default: "false", label: "RCONEnabled", desc: "تفعيل تحكم RCON." },
            { key: "RCONPort", default: "27020", label: "RCONPort", desc: "بورت تحكم RCON." },
            { key: "RCONServerGameLogBuffer", default: "600.0", label: "RCONServerGameLogBuffer", desc: "حجم مخزن سجلات السيرفر لـ RCON." },
            { key: "ResourcesRespawnPeriodMultiplier", default: "1.0", label: "ResourcesRespawnPeriodMultiplier", desc: "مضاعف سرعة إعادة ظهور الموارد." },
            { key: "ServerAdminPassword", default: "PUT YOUR PASSWORD HERE!!!!!!!!!", label: "ServerAdminPassword", desc: "كلمة مرور الأدمن." },
            { key: "ServerCrosshair", default: "true", label: "ServerCrosshair", desc: "تفعيل علامة التصويب." },
            { key: "ServerForceNoHUD", default: "false", label: "ServerForceNoHUD", desc: "إجبار إخفاء الـ HUD." },
            { key: "ServerHardcore", default: "false", label: "ServerHardcore", desc: "وضع الهاردكور (الموت النهائي)." },
            { key: "ServerPassword", default: "PUT YOUR PASSWORD HERE!!!!!!", label: "ServerPassword", desc: "كلمة مرور دخول السيرفر." },
            { key: "serverPVE", default: "false", label: "serverPVE", desc: "تشغيل وضع PvE للسيرفر." },
            { key: "ShowFloatingDamageText", default: "false", label: "ShowFloatingDamageText", desc: "إظهار أرقام الضرر المتطايرة." },
            { key: "ShowMapPlayerLocation", default: "true", label: "ShowMapPlayerLocation", desc: "إظهار مكان اللاعب على الخريطة." },
            { key: "StructurePickupHoldDuration", default: "0.5", label: "StructurePickupHoldDuration", desc: "مدة الضغط لالتقاط الهياكل." },
            { key: "StructurePickupTimeAfterPlacement", default: "30.0", label: "StructurePickupTimeAfterPlacement", desc: "فترة السماح لالتقاط الهيكل بعد وضعه." },
            { key: "StructurePreventResourceRadiusMultiplier", default: "1.0", label: "StructurePreventResourceRadiusMultiplier", desc: "مضاعف نصف قطر منع الموارد حول المباني." },
            { key: "StructureResistanceMultiplier", default: "1.0", label: "StructureResistanceMultiplier", desc: "مضاعف مقاومة الهياكل للضرر." },
            { key: "TamingSpeedMultiplier", default: "1.0", label: "TamingSpeedMultiplier", desc: "مضاعف سرعة الترويض." },
            { key: "TheMaxStructuresInRange", default: "10500", label: "TheMaxStructuresInRange", desc: "الحد الأقصى للهياكل داخل النطاق." },
            { key: "TribeNameChangeCooldown", default: "15.0", label: "TribeNameChangeCooldown", desc: "فترة انتظار تغيير اسم القبيلة." },
            { key: "XPMultiplier", default: "1.0", label: "XPMultiplier", desc: "مضاعف الخبرة العامة." },
            { key: "YoungIceFoxDeathCooldown", default: "3600", label: "YoungIceFoxDeathCooldown", desc: "فترة انتظار الموت للثعلب الجليدي الصغير." },
            { key: "CrossARKAllowForeignDinoDownloads", default: "false", label: "CrossARKAllowForeignDinoDownloads", desc: "السماح بتحميل ديناصورات خارجية عبر الكروس آرك." },
            { key: "noTributeDownloads", default: "false", label: "noTributeDownloads", desc: "منع تحميل الجزية." },
            { key: "PreventDownloadDinos", default: "false", label: "PreventDownloadDinos", desc: "منع تحميل الديناصورات." },
            { key: "PreventDownloadItem", default: "false", label: "PreventDownloadItem", desc: "منع تحميل العناصر." },
            { key: "PreventDownloadSurvivors", default: "false", label: "PreventDownloadSurvivors", desc: "منع تحميل الناجين." },
            { key: "PreventUploadDinos", default: "false", label: "PreventUploadDinos", desc: "منع رفع الديناصورات." },
            { key: "PreventUploadItems", default: "false", label: "PreventUploadItems", desc: "منع رفع العناصر." },
            { key: "PreventUploadSurvivors", default: "false", label: "PreventUploadSurvivors", desc: "منع رفع الناجين." },
            { key: "BadWordListURL", default: "", label: "BadWordListURL", desc: "رابط قائمة الكلمات الممنوعة." },
            { key: "BadWordWhiteListURL", default: "", label: "BadWordWhiteListURL", desc: "رابط القائمة البيضاء للكلمات." },
            { key: "LimitBunkersPerTribe", default: "true", label: "LimitBunkersPerTribe", desc: "تحديد عدد التحصينات لكل قبيلة." },
            { key: "LimitBunkersPerTribeNum", default: "3", label: "LimitBunkersPerTribeNum", desc: "عدد التحصينات المسموحة لكل قبيلة." },
            { key: "AllowBunkersInPreventionZones", default: "false", label: "AllowBunkersInPreventionZones", desc: "السماح بالتحصينات في مناطق الحظر." },
            { key: "AllowRidingDinosInsideBunkers", default: "true", label: "AllowRidingDinosInsideBunkers", desc: "السماح بركوب الديناصورات داخل التحصينات." },
            { key: "AllowBunkerModulesAboveGround", default: "false", label: "AllowBunkerModulesAboveGround", desc: "السماح بوحدات التحصينات فوق الأرض." },
            { key: "AllowDinoAIInsideBunkers", default: "true", label: "AllowDinoAIInsideBunkers", desc: "السماح بذكاء الديناصورات الاصطناعي داخل التحصينات." },
            { key: "AllowBunkerModulesInPreventionZones", default: "false", label: "AllowBunkerModulesInPreventionZones", desc: "السماح بوحدات التحصينات في مناطق الحظر." },
            { key: "MinDistanceBetweenBunkers", default: "3000.0", label: "MinDistanceBetweenBunkers", desc: "أقل مسافة مسموحة بين التحصينات." },
            { key: "EnemyAccessBunkerHPThreshold", default: "0.25", label: "EnemyAccessBunkerHPThreshold", desc: "حد صحة التحصينات لدخول الأعداء." },
            { key: "BunkerUnderHPThresholdDmgMultiplier", default: "0.05", label: "BunkerUnderHPThresholdDmgMultiplier", desc: "مضاعف الضرر تحت حد صحة التحصين." },
            { key: "CryoHospitalHoursToRegenHP", default: "1.0", label: "CryoHospitalHoursToRegenHP", desc: "ساعات استشفاء الصحة لمستشفى الكرايو." },
            { key: "CryoHospitalHoursToRegenFood", default: "24.0", label: "CryoHospitalHoursToRegenFood", desc: "ساعات استعادة الطعام لمستشفى الكرايو." },
            { key: "CryoHospitalHoursToDrainTorpor", default: "1.0", label: "CryoHospitalHoursToDrainTorpor", desc: "ساعات تصريف التوربور لمستشفى الكرايو." },
            { key: "CryoHospitalMatingCooldownReduction", default: "2.0", label: "CryoHospitalMatingCooldownReduction", desc: "تقليل فترة انتظار التزاوج بمستشفى الكرايو." },
            { key: "BloodforgeReinforceExtraDurability", default: "0.3", label: "BloodforgeReinforceExtraDurability", desc: "متانة إضافية لتعزيز بلودفورج." },
            { key: "BloodforgeReinforceResourceCostMultiplier", default: "3.0", label: "BloodforgeReinforceResourceCostMultiplier", desc: "مضاعف تكلفة موارد تعزيز بلودفورج." },
            { key: "BloodforgeReinforceSpeedMultiplier", default: "0.1", label: "BloodforgeReinforceSpeedMultiplier", desc: "مضاعف سرعة تعزيز بلودفورج." },
            { key: "MaxActiveOutposts", default: "", label: "MaxActiveOutposts", desc: "الحد الأقصى للنقاط الأمامية النشطة." },
            { key: "MaxActiveResourceCaches", default: "", label: "MaxActiveResourceCaches", desc: "الحد الأقصى لمخازن الموارد النشطة." },
            { key: "MaxActiveCityOutposts", default: "", label: "MaxActiveCityOutposts", desc: "الحد الأقصى لنقاط المدن الأمامية النشطة." },
            { key: "Port", default: "7777", label: "Port", desc: "بورت اتصال السيرفر." },
            { key: "SessionName", default: "PUT YOUR SERVER NAME HERE!!!!!!!!!", label: "SessionName", desc: "اسم جلسة السيرفر." },
            { key: "Duration", default: "20", label: "Duration", desc: "مدة عرض رسالة اليوم (MOTD)." },
            { key: "Message", default: "", label: "Message", desc: "رسالة الترحيب عند الدخول (MOTD)." }
        ]
    },
    gameini: {
        title: "game.ini",
        description: "إعدادات اللعب المتقدمة وتربية الديناصورات والصناعة",
        headerTag: "[/script/shootergame.shootergamemode]",
        settings: [
            { key: "BabyCuddleGracePeriodMultiplier", default: "1.0", label: "BabyCuddleGracePeriodMultiplier", desc: "مضاعف فترة السماح للعناية بالصغار." },
            { key: "BabyCuddleIntervalMultiplier", default: "1.0", label: "BabyCuddleIntervalMultiplier", desc: "مضاعف الفاصل الزمني لطلبات العناية بالصغار." },
            { key: "BabyCuddleLoseImprintQualitySpeedMultiplier", default: "1.0", label: "BabyCuddleLoseImprintQualitySpeedMultiplier", desc: "مضاعف سرعة فقدان جودة الإمبرنت." },
            { key: "BabyFoodConsumptionSpeedMultiplier", default: "1.0", label: "BabyFoodConsumptionSpeedMultiplier", desc: "معدل استهلاك طعام الصغار." },
            { key: "BabyImprintAmountMultiplier", default: "1.0", label: "BabyImprintAmountMultiplier", desc: "مضاعف نسبة الإمبرنت لكل رعاية." },
            { key: "BabyImprintingStatScaleMultiplier", default: "1.0", label: "BabyImprintingStatScaleMultiplier", desc: "مضاعف تأثير الإمبرنت على الستاتس." },
            { key: "BabyMatureSpeedMultiplier", default: "1.0", label: "BabyMatureSpeedMultiplier", desc: "سرعة نضج الصغار." },
            { key: "bAllowUnclaimDinos", default: "true", label: "bAllowUnclaimDinos", desc: "السماح بالتخلي عن الديناصورات." },
            { key: "bAllowCustomRecipes", default: "true", label: "bAllowCustomRecipes", desc: "السماح بالوصفات المخصصة." },
            { key: "bAllowFlyerSpeedLeveling", default: "false", label: "bAllowFlyerSpeedLeveling", desc: "السماح بتطوير سرعة الطيور." },
            { key: "bAllowPlatformSaddleMultiFloors", default: "false", label: "bAllowPlatformSaddleMultiFloors", desc: "السماح بطوابق متعددة على سرج المنصة." },
            { key: "bAllowSpeedLeveling", default: "false", label: "bAllowSpeedLeveling", desc: "السماح بتطوير السرعة." },
            { key: "bAllowUnlimitedRespecs", default: "false", label: "bAllowUnlimitedRespecs", desc: "السماح بإعادة توزيع النقاط بلا حدود." },
            { key: "BaseTemperatureMultiplier", default: "1.0", label: "BaseTemperatureMultiplier", desc: "مضاعف درجات الحرارة الأساسية." },
            { key: "bDisableFriendlyFire", default: "false", label: "bDisableFriendlyFire", desc: "تعطيل نيران الأصدقاء (صديق يصيب صديقه)." },
            { key: "bDisableLootCrates", default: "false", label: "bDisableLootCrates", desc: "تعطيل دروبات اللوت." },
            { key: "bDisablePhotoMode", default: "false", label: "bDisablePhotoMode", desc: "تعطيل وضع التصوير." },
            { key: "bDisableStructurePlacementCollision", default: "false", label: "bDisableStructurePlacementCollision", desc: "تعطيل اصطدام وضع الهياكل." },
            { key: "bFlyerPlatformAllowUnalignedDinoBasing", default: "false", label: "bFlyerPlatformAllowUnalignedDinoBasing", desc: "السماح بوقوف الديناصورات غير المحاذاة على منصات الطيور." },
            { key: "bIgnoreStructuresPreventionVolumes", default: "false", label: "bIgnoreStructuresPreventionVolumes", desc: "تجاهل مساحات منع الهياكل." },
            { key: "bIncreasePvPRespawnInterval", default: "true", label: "bIncreasePvPRespawnInterval", desc: "زيادة فترة إعادة ظهور PvP." },
            { key: "bOnlyAllowSpecifiedEngrams", default: "false", label: "bOnlyAllowSpecifiedEngrams", desc: "السماح فقط بالإنغرامات المحددة." },
            { key: "bPassiveDefensesDamageRiderlessDinos", default: "false", label: "bPassiveDefensesDamageRiderlessDinos", desc: "تسبب الدفاعات السلبية ضرراً للديناصورات بدون راكب." },
            { key: "bPvEAllowTribeWar", default: "true", label: "bPvEAllowTribeWar", desc: "السماح بحروب القبائل في PvE." },
            { key: "bPvEAllowTribeWarCancel", default: "false", label: "bPvEAllowTribeWarCancel", desc: "السماح بإلغاء حروب القبائل في PvE." },
            { key: "bPvEDisableFriendlyFire", default: "false", label: "bPvEDisableFriendlyFire", desc: "تعطيل نيران الأصدقاء في PvE." },
            { key: "bShowCreativeMode", default: "false", label: "bShowCreativeMode", desc: "إظهار وضع الإبداع." },
            { key: "bUseCorpseLocator", default: "true", label: "bUseCorpseLocator", desc: "إظهار مكان الجثة." },
            { key: "bUseDinoLevelUpAnimations", default: "true", label: "bUseDinoLevelUpAnimations", desc: "تفعيل حركات رفع لفل الديناصور." },
            { key: "bUseSingleplayerSettings", default: "false", label: "bUseSingleplayerSettings", desc: "استخدام إعدادات اللعب الفردي." },
            { key: "bUseTameLimitForStructuresOnly", default: "false", label: "bUseTameLimitForStructuresOnly", desc: "استخدام حد الترويض للهياكل فقط." },
            { key: "CraftingSkillBonusMultiplier", default: "1.0", label: "CraftingSkillBonusMultiplier", desc: "مضاعف مكافأة مهارة الصناعة." },
            { key: "CraftXPMultiplier", default: "1.0", label: "CraftXPMultiplier", desc: "مضاعف خبرة الصناعة." },
            { key: "CropDecaySpeedMultiplier", default: "1.0", label: "CropDecaySpeedMultiplier", desc: "سرعة تلف المحاصيل." },
            { key: "CropGrowthSpeedMultiplier", default: "1.0", label: "CropGrowthSpeedMultiplier", desc: "سرعة نمو المحاصيل." },
            { key: "CustomRecipeEffectivenessMultiplier", default: ".0", label: "CustomRecipeEffectivenessMultiplier", desc: "مضاعف فعالية الوصفات المخصصة." },
            { key: "CustomRecipeSkillMultiplier", default: "1.0", label: "CustomRecipeSkillMultiplier", desc: "مضاعف مهارة الوصفات المخصصة." },
            { key: "DestroyTamesOverLevelClamp", default: "0", label: "DestroyTamesOverLevelClamp", desc: "تدمير المروضات التي تتجاوز سقف اللفل." },
            { key: "DinoHarvestingDamageMultiplier", default: "3.2", label: "DinoHarvestingDamageMultiplier", desc: "مضاعف ضرر حصاد الديناصورات." },
            { key: "DinoTurretDamageMultiplie", default: "1.0", label: "DinoTurretDamageMultiplie", desc: "مضاعف ضرر أبراج الدفاع على الديناصورات." },
            { key: "EggHatchSpeedMultiplier", default: "1.0", label: "EggHatchSpeedMultiplier", desc: "سرعة فقس البيض." },
            { key: "FastDecayInterval", default: "43200", label: "FastDecayInterval", desc: "فترة التحلل السريع." },
            { key: "FishingLootQualityMultiplier", default: "1.0", label: "FishingLootQualityMultiplier", desc: "مضاعف جودة لوت الصيد." },
            { key: "FuelConsumptionIntervalMultiplier", default: "1.0", label: "FuelConsumptionIntervalMultiplier", desc: "مضاعف استهلاك الوقود." },
            { key: "LimitGeneratorsNum", default: "3", label: "LimitGeneratorsNum", desc: "الحد الأقصى لعدد المولدات." },
            { key: "LimitGeneratorsRange", default: "15000", label: "LimitGeneratorsRange", desc: "نطاق مسافة المولدات." },
            { key: "GenericXPMultiplier", default: "1.0", label: "GenericXPMultiplier", desc: "مضاعف الخبرة العام." },
            { key: "GlobalCorpseDecompositionTimeMultiplier", default: "1.0", label: "GlobalCorpseDecompositionTimeMultiplier", desc: "مضاعف وقت تحلل الجثث العام." },
            { key: "GlobalItemDecompositionTimeMultiplier", default: "1.0", label: "GlobalItemDecompositionTimeMultiplier", desc: "مضاعف وقت تحلل العناصر العام." },
            { key: "GlobalPoweredBatteryDurabilityDecreasePerSecond", default: "3.0", label: "GlobalPoweredBatteryDurabilityDecreasePerSecond", desc: "معدل فقدان متانة البطاريات المشحونة لكل ثانية." },
            { key: "GlobalSpoilingTimeMultiplier", default: "1.0", label: "GlobalSpoilingTimeMultiplier", desc: "مضاعف وقت فساد الطعام العام." },
            { key: "HairGrowthSpeedMultiplier", default: "0", label: "HairGrowthSpeedMultiplier", desc: "سرعة نمو الشعر." },
            { key: "HarvestXPMultiplier", default: "1.0", label: "HarvestXPMultiplier", desc: "مضاعف خبرة الحصاد." },
            { key: "IgnorePVPMountedWeaponryRestrictions", default: "false", label: "IgnorePVPMountedWeaponryRestrictions", desc: "تجاهل قيود الأسلحة المثبتة في PvP." },
            { key: "IncreasePvPRespawnIntervalBaseAmount", default: "60.0", label: "IncreasePvPRespawnIntervalBaseAmount", desc: "الأساس الزمني لزيادة وقت إعادة الظهور في PvP." },
            { key: "IncreasePvPRespawnIntervalCheckPeriod", default: "300.0", label: "IncreasePvPRespawnIntervalCheckPeriod", desc: "فترة فحص زيادة وقت إعادة الظهور في PvP." },
            { key: "IncreasePvPRespawnIntervalMultiplier", default: "2.0", label: "IncreasePvPRespawnIntervalMultiplier", desc: "مضاعف زيادة فترة إعادة الظهور في PvP." },
            { key: "KillXPMultiplier", default: "1.0", label: "KillXPMultiplier", desc: "مضاعف خبرة القتل." },
            { key: "LayEggIntervalMultiplier", default: "1.0", label: "LayEggIntervalMultiplier", desc: "مضاعف فاصل وضع البيض." },
            { key: "LimitNonPlayerDroppedItemsCount", default: "0", label: "LimitNonPlayerDroppedItemsCount", desc: "حد العناصر الساقطة غير التابعة للاعب." },
            { key: "LimitNonPlayerDroppedItemsRange", default: "0", label: "LimitNonPlayerDroppedItemsRange", desc: "نطاق العناصر الساقطة غير التابعة للاعب." },
            { key: "MatingIntervalMultiplier", default: "1.0", label: "MatingIntervalMultiplier", desc: "مضاعف فترة التزاوج." },
            { key: "MatingSpeedMultiplier", default: "1.0", label: "MatingSpeedMultiplier", desc: "مضاعف سرعة التزاوج." },
            { key: "MaxFallSpeedMultiplier", default: "1.0", label: "MaxFallSpeedMultiplier", desc: "مضاعف سرعة السقوط القصوى." },
            { key: "MaxNumberOfPlayersInTribe", default: "0", label: "MaxNumberOfPlayersInTribe", desc: "الحد الأقصى لعدد اللاعبين في القبيلة." },
            { key: "MaxTribeLogs", default: "400", label: "MaxTribeLogs", desc: "الحد الأقصى لسجلات القبيلة." },
            { key: "PassiveTameIntervalMultiplier", default: "1.0", label: "PassiveTameIntervalMultiplier", desc: "مضاعف الترويض السلبي (الباسيف)." },
            { key: "PhotoModeRangeLimit", default: "3000", label: "PhotoModeRangeLimit", desc: "حد نطاق وضع التصوير." },
            { key: "PlayerHarvestingDamageMultiplier", default: "1.0", label: "PlayerHarvestingDamageMultiplier", desc: "مضاعف ضرر حصاد اللاعب." },
            { key: "PoopIntervalMultiplier", default: "1.0", label: "PoopIntervalMultiplier", desc: "مضاعف فاصل إخراج الفضلات." },
            { key: "PreventOfflinePvPConnectionInvincibleInterval", default: "5.0", label: "PreventOfflinePvPConnectionInvincibleInterval", desc: "فترة الحماية عند قطع الاتصال لمنع الـ PvP." },
            { key: "PvPZoneStructureDamageMultiplier", default: "6.0", label: "PvPZoneStructureDamageMultiplier", desc: "مضاعف ضرر الهياكل في مناطق PvP." },
            { key: "ResourceNoReplenishRadiusPlayers", default: "1.0", label: "ResourceNoReplenishRadiusPlayers", desc: "نطاق عدم تجدد الموارد قرب اللاعبين." },
            { key: "ResourceNoReplenishRadiusStructures", default: "1.0", label: "ResourceNoReplenishRadiusStructures", desc: "نطاق عدم تجدد الموارد قرب الهياكل." },
            { key: "SpecialXPMultiplier", default: "1.0", label: "SpecialXPMultiplier", desc: "مضاعف الخبرة الخاص." },
            { key: "StructureDamageRepairCooldown", default: "180", label: "StructureDamageRepairCooldown", desc: "فترة انتظار إصلاح الهياكل بعد الضرر." },
            { key: "SupplyCrateLootQualityMultiplier", default: "1.0", label: "SupplyCrateLootQualityMultiplier", desc: "مضاعف جودة لوت دروبات الإمداد." },
            { key: "TamedDinoCharacterFoodDrainMultiplier", default: "1.0", label: "TamedDinoCharacterFoodDrainMultiplier", desc: "معدل استهلاك طعام الديناصورات المروضة." },
            { key: "TamedDinoTorporDrainMultiplier", default: "1.0", label: "TamedDinoTorporDrainMultiplier", desc: "معدل تفريغ التوربور للديناصورات المروضة." },
            { key: "TribeTowerBonusMultiplier", default: "2.0", label: "TribeTowerBonusMultiplier", desc: "مضاعف مكافأة أبراج القبيلة." },
            { key: "TribeSlotReuseCooldown", default: "0.0", label: "TribeSlotReuseCooldown", desc: "فترة إعادة استخدام خانة القبيلة." },
            { key: "UseCorpseLifeSpanMultiplier", default: "1.0", label: "UseCorpseLifeSpanMultiplier", desc: "مضاعف عمر الجثث." },
            { key: "WildDinoCharacterFoodDrainMultiplier", default: "1.0", label: "WildDinoCharacterFoodDrainMultiplier", desc: "معدل استهلاك طعام الديناصورات البرية." },
            { key: "WildDinoTorporDrainMultiplier", default: "1.0", label: "WildDinoTorporDrainMultiplier", desc: "معدل تفريغ التوربور للديناصورات البرية." },
            { key: "bHardLimitTurretsInRange", default: "false", label: "bHardLimitTurretsInRange", desc: "الحد الصارم للأبراج في النطاق." },
            { key: "bLimitTurretsInRange", default: "true", label: "bLimitTurretsInRange", desc: "تحديد عدد الأبراج في النطاق." },
            { key: "LimitTurretsNum", default: "100", label: "LimitTurretsNum", desc: "الحد الأقصى لعدد الأبراج المسموحة." },
            { key: "LimitTurretsRange", default: "10000.0", label: "LimitTurretsRange", desc: "نطاق حساب عدد الأبراج." },
            { key: "AdjustableMutagenSpawnDelayMultiplier", default: "1.0", label: "AdjustableMutagenSpawnDelayMultiplier", desc: "مضاعف تأخير ظهور الميتاجين القابل للتعديل." },
            { key: "BaseHexagonRewardMultiplier", default: "1.0", label: "BaseHexagonRewardMultiplier", desc: "مضاعف مكافأة الهيكساجون الأساسية." },
            { key: "bDisableHexagonStore", default: "false", label: "bDisableHexagonStore", desc: "تعطيل متجر الهيكساجون." },
            { key: "bDisableDefaultMapItemSets", default: "false", label: "bDisableDefaultMapItemSets", desc: "تعطيل مجموعات عناصر الخريطة الافتراضية." },
            { key: "bDisableGenesisMissions", default: "false", label: "bDisableGenesisMissions", desc: "تعطيل مهمات جينيسيس." },
            { key: "bDisableWorldBuffs", default: "false", label: "bDisableWorldBuffs", desc: "تعطيل بوفات العالم." },
            { key: "bEnableWorldBuffScaling", default: "false", label: "bEnableWorldBuffScaling", desc: "تفعيل قياس بوفات العالم." },
            { key: "bGenesisUseStructuresPreventionVolumes", default: "false", label: "bGenesisUseStructuresPreventionVolumes", desc: "استخدام مساحات منع الهياكل في جينيسيس." },
            { key: "bHexStoreAllowOnlyEngramTradeOption", default: "false", label: "bHexStoreAllowOnlyEngramTradeOption", desc: "السماح بخيار التجارة بالإنغرامات فقط في متجر الهيكساجون." },
            { key: "HexagonCostMultiplier", default: "1.0", label: "HexagonCostMultiplier", desc: "مضاعف تكلفة الهيكساجون." },
            { key: "WorldBuffScalingEfficacy", default: "1.0", label: "WorldBuffScalingEfficacy", desc: "فاعلية قياس بوفات العالم." }
        ]
    }
};

// تبديل نوع الملف عند الضغط على الأزرار العلوية
function switchConfigFile(type) {
    currentActiveConfigType = type;
    
    const btnUS = document.getElementById('btnUserSettings');
    const btnGI = document.getElementById('btnGameIni');
    
    if (type === 'usersettings') {
        btnUS.className = "btn btn-primary";
        btnGI.className = "btn btn-gray";
    } else {
        btnGI.className = "btn btn-primary";
        btnUS.className = "btn btn-gray";
    }
    
    const configData = arkConfigs[type];
    document.getElementById('configDescription').innerText = configData.description;
    
    const container = document.getElementById('configEditorContainer');
    container.innerHTML = '';
    
    configData.settings.forEach((item) => {
        const row = document.createElement('div');
        row.className = 'config-option-item';
        row.innerHTML = `
            <label>${item.label}</label>
            <div class="config-desc">${item.desc}</div>
            <input type="text" class="config-input-field" data-key="${item.key}" data-default="${item.default}" value="${item.default}" placeholder="القيمة: ${item.default}">
        `;
        container.appendChild(row);
    });
    
    document.getElementById('serverConfigOutput').innerText = "";
    window.currentFullConfigText = "";
    window.currentModifiedConfigText = "";
}

// تحضير النصوص عند الضغط على أزرار النسخ
function prepareConfigTexts() {
    const configData = arkConfigs[currentActiveConfigType];
    const inputs = document.querySelectorAll('#configEditorContainer .config-input-field');
    
    let fullOutput = `${configData.headerTag}\n`;
    let modifiedOutput = `/* التعديلات المخصصة فقط (${currentActiveConfigType}) */\n`;
    let hasChanges = false;
    
    inputs.forEach(input => {
        const key = input.getAttribute('data-key');
        const defaultValue = input.getAttribute('data-default');
        const val = input.value.trim() !== '' ? input.value : defaultValue;
        
        fullOutput += `${key}=${val}\n`;
        
        if (val !== defaultValue) {
            modifiedOutput += `${key}=${val}\n`;
            hasChanges = true;
        }
    });
    
    if (!hasChanges) {
        modifiedOutput += `; لم يتم تعديل أي قيمة عن الوضع الافتراضي.\n`;
    }
    
    window.currentFullConfigText = fullOutput;
    window.currentModifiedConfigText = modifiedOutput;
}

function copyFullConfig() {
    prepareConfigTexts();
    navigator.clipboard.writeText(window.currentFullConfigText || '');
    document.getElementById('serverConfigOutput').innerText = window.currentFullConfigText;
    alert('تم نسخ الملف كاملاً وعرضه في الصندوق بنجاح!');
}

function copyModifiedConfigOnly() {
    prepareConfigTexts();
    navigator.clipboard.writeText(window.currentModifiedConfigText || '');
    document.getElementById('serverConfigOutput').innerText = window.currentModifiedConfigText;
    alert('تم نسخ التعديلات المخصصة فقط وعرضها في الصندوق بنجاح!');
}

// باقي دوال الأدوات الأخرى
function generateLevelCode() {
    const maxLevel = parseInt(document.getElementById('maxLevel').value) || 100;
    let xpArray = [];
    let code = 'LevelExperienceRampOverrides=(';
    
    for(let i = 0; i <= maxLevel; i++) {
        let xp = i <= 10 ? Math.floor(5 + (i * 5)) : Math.floor(50 + Math.pow(i-10, 2) * 0.8);
        xpArray.push(xp);
        code += `ExperiencePointsForLevel[${i}]=${xp},`;
    }
    localStorage.setItem('currentXPArray', JSON.stringify(xpArray));
    code = code.slice(0, -1) + ')';
    document.getElementById('levelCode').innerText = code;
}

function calculateTotalXP() {
    const xpArray = JSON.parse(localStorage.getItem('currentXPArray')) || [];
    const totalXP = xpArray.reduce((acc, curr) => acc + curr, 0);
    const output = `OverrideMaxExperiencePointsPlayer=70368744177664\nOverrideMaxExperiencePointsPlayer=${totalXP}\nOverrideMaxExperiencePointsDino=2147483647`;
    document.getElementById('totalXP').innerText = output;
}

function generateEngramPoints() {
    const maxLevel = parseInt(document.getElementById('engramLevel').value) || 60;
    const basePoints = parseInt(document.getElementById('engramPoints').value) || 8;
    const boostLevel = parseInt(document.getElementById('engramBoostLevel').value) || 10;
    const boostPoints = parseInt(document.getElementById('engramBoostPoints').value) || 14;
    
    let code = '';
    for(let i = 0; i <= maxLevel; i++) {
        const points = i < boostLevel ? basePoints : boostPoints;
        code += `OverridePlayerLevelEngramPoints=${points}\n`;
    }
    document.getElementById('engramOutput').innerText = code;
}

function addResource() {
    const container = document.getElementById('resourceRequirements');
    const newRow = document.createElement('div');
    newRow.className = 'input-row resource-row';
    newRow.innerHTML = `
        <div class="input-field">
            <label>مادة ${container.children.length + 1}</label>
            <div class="input-row">
                <input type="text" class="resource-id" placeholder="ID المادة">
                <input type="number" class="resource-amount" placeholder="الكمية" min="1" value="100">
                <button class="btn btn-accent" onclick="removeResource(this)"><i class="fas fa-trash"></i></button>
            </div>
        </div>
    `;
    container.appendChild(newRow);
}

function removeResource(btn) {
    btn.closest('.resource-row').remove();
}

function generateCraftingCode() {
    const itemId = document.getElementById('itemId').value || 'SoulTerminal_DS_C';
    let requirements = '';
    document.querySelectorAll('.resource-row').forEach(row => {
        const id = row.querySelector('.resource-id').value;
        const amount = row.querySelector('.resource-amount').value;
        if (id && amount) {
            requirements += `(ResourceItemTypeString="${id}",BaseResourceRequirement=${amount},bCraftingRequireExactResourceType=false),`;
        }
    });
    const code = `ConfigOverrideItemCraftingCosts=(ItemClassString="${itemId}",BaseCraftingResourceRequirements=(${requirements.slice(0, -1)}))`;
    document.getElementById('craftingOutput').innerText = code;
}

function generateDinoCode() {
    const dinoId = document.getElementById('dinoId').value || 'Gigant_Character_BP_C';
    const level = document.getElementById('dinoLevel').value || 60;
    document.getElementById('dinoOutput').innerText = `cheat gmsummon "${dinoId}" ${level} 1 0`;
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const icon = document.querySelector('.theme-toggle i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode') ? 'enabled' : 'disabled');
}

function copyCustomCodeBox(btn) {
    const codeBox = btn.nextElementSibling;
    if (!codeBox.innerText.trim()) {
        alert('الصندوق فارغ! الرجاء الضغط على أحد أزرار النسخ بالأعلى أولاً.');
        return;
    }
    navigator.clipboard.writeText(codeBox.innerText);
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> تم النسخ!';
    setTimeout(() => { btn.innerHTML = originalText; }, 2000);
}

function toggleTool(header) {
    const content = header.parentElement.querySelector('.tool-content');
    const icon = header.querySelector('.fa-chevron-up, .fa-chevron-down');
    content.classList.toggle('collapsed');
    icon.classList.toggle('fa-chevron-up');
    icon.classList.toggle('fa-chevron-down');
}

document.addEventListener('DOMContentLoaded', function() {
    addResource();
    switchConfigFile('usersettings');
    
    document.querySelectorAll('.tool-content').forEach(content => {
        content.classList.add('collapsed');
    });
    document.querySelectorAll('.tool-header i.fa-chevron-up').forEach(icon => {
        icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
    });

    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        document.querySelector('.theme-toggle i').classList.replace('fa-moon', 'fa-sun');
    }
});