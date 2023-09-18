﻿const { Client, EmbedBuilder, PermissionsBitField, ActionRowBuilder, ButtonStyle, ButtonBuilder } = require("discord.js");
const louritydb = require("croxydb")
//discord.gg/altyapilar
module.exports = {
    name: "müşteri-bilgilendirme-mesajı",
    description: "Bırakın müşteriyi otomatik bilgilendirelim.",
    type: 1,
    options: [
        {
            name: "hizmet-seçin",
            description: "Müşteri'nin alacağı hizmeti seçin, bu sayede daha iyi yardımcı olabileyim.",
            type: 3,
            required: true,
            choices: [
                {
                    name: "🤖 Discord Üye Hizmetleri",
                    value: 'dcUyeHizmeti'
                },
                {
                    name: "💎 İnstagram Takipçi Hizmetleri",
                    value: 'instagramtakipcihizmeti'
                },
                {
                    name: "📋 Diğer Hizmetler",
                    value: 'digerHizmetler'
                }
            ]
        },
        {
            name: "müşteri",
            description: "Müşteriyi seçin.",
            type: 6,
            required: true,
        },
    ],

    run: async (client, interaction) => {

        let siparisYetkili = louritydb.get(`siparisSistemi_${interaction.guild.id}`)

        const ayarliDegil = new EmbedBuilder()
            .setColor("Red")
            .setDescription("Sipariş sistemi ayarlı değil!")

        if (!siparisYetkili) return interaction.reply({ embeds: [ayarliDegil], ephemeral: true })

        const yetkinYok = new EmbedBuilder()
            .setColor("Red")
            .setDescription(`Sistemi kullanmak için <@&${siparisYetkili}> yetkisine sahip olmalısın.`)

        if (!interaction.member.roles.cache.has(siparisYetkili)) return interaction.reply({ embeds: [yetkinYok], ephemeral: true })

        const musteri = interaction.options.getMember('müşteri')
        let input = interaction.options.getString('hizmet-seçin')


        if (input === 'dcUyeHizmeti') {

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setLabel("Davet Linkini Gir")
                        .setStyle(ButtonStyle.Primary)
                        .setCustomId("davet")
                )
                .addComponents(
                    new ButtonBuilder()
                        .setLabel("Botu Ekledim")
                        .setStyle(ButtonStyle.Success)
                        .setCustomId("ekledim")
                )

            const dcUyeHizmetiEmbed = new EmbedBuilder()
                .setColor("Green")
                .setThumbnail("https://cdn.discordapp.com/attachments/1148991949257314455/1148992054022643782/Ekran_goruntusu_2023-09-06_150246.png")
		.setDescription(`> Selam, **${musteri.user.username}** 👋\n\nℹ️ **Discord Üye Hizmeti İçin Ne Yapmalıyım?**\n\n:one: Bayiye hizmet ücretini ödeyiniz\n:two: Sunucunuzun *sınırsız* davet linkini iletin\n:three: Gönderilmesini Bekleyin.\n\n Eğer Hızlı Ödeme İstiyorsanız ↗️ [[Tıklayın]](https://www.itemsatis.com/p/AntiErrorShop)  `)
                .setFooter({ text: "Discord üye hizmetlerimiz yaklaşık 10-15 dakika içerisinde tamamlanır!" })

            return interaction.reply({ content: `${musteri}`, embeds: [dcUyeHizmetiEmbed], components: [row] })
        }


        if (input === 'instagramtakipcihizmet') {

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setLabel("Profil Linkini Gir")
                        .setStyle(ButtonStyle.Primary)
                        .setCustomId("link")
                )

            const instagramtakipcihizmetiEmbed = new EmbedBuilder()
                .setColor("Green")
                .setThumbnail("https://cdn.discordapp.com/attachments/1148991949257314455/1148992054022643782/Ekran_goruntusu_2023-09-06_150246.png")
                .setDescription(`> Selam, **${musteri.user.username}** 👋\n\nℹ️ **İnstagram Takipçi Hizmeti İçin Ne Yapmalıyım?**\n\n:one: Bayiye hizmet ücretini ödeyiniz\n:two: Profilinizin linkini iletin\n:three: Ardından hizmetin gönderilmesini bekleyin\n\n Eğer Hızlı Ödeme İstiyorsanız ↗️ [[Tıklayın]](https://www.itemsatis.com/p/AntiErrorShop)`)
                .setFooter({ text: "Discord boost hizmetlerimiz yaklaşık 2-3 saat içerisinde tamamlanır, yoğunluğa bağlı olarak 1 gün sürme ihtimali vardır!" })

            return interaction.reply({ content: `${musteri}`, embeds: [instagramtakipcihizmetiEmbed], components: [row] })
        }


        if (input === 'digerHizmetler') {

            const digerHizmetlerEmbed = new EmbedBuilder()
                .setColor("Green")
                .setThumbnail("https://cdn.discordapp.com/attachments/1148991949257314455/1148992054022643782/Ekran_goruntusu_2023-09-06_150246.png")
                .setDescription(`> Selam, **${musteri.user.username}** 👋\n\nℹ️ **Sosyal Medya Hizmetleri İçin Ne Yapmalıyım?**\n\n:one: Bayiye hizmet ücretini ödeyiniz\n:two: Hizmetin gönderileceği hesap/gönderi __linkini__ iletin\n:three: Ardından hizmetin gönderilmesini bekleyin\n\n❗ **Hesabınızın __gizlide__ olmadığından emin olun!**\n\n Eğer Hızlı Ödeme İstiyorsanız ↗️ [[Tıklayın]](https://www.itemsatis.com/p/AntiErrorShop)`)
                .setFooter({ text: "Sosyal medya hizmetlerimizin süreleri değişmektedir, max 1 gün içerisinde teslim edilir!" })

            return interaction.reply({ content: `${musteri}`, embeds: [digerHizmetlerEmbed] })
        }
    }
};