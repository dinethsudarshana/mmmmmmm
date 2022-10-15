FROM sisula/whatsapp_bot:alpine

RUN git clone https://github.com/sisula/COBRA-MD /root/cobra_md
WORKDIR /root/cobra_md/
ENV TZ=Asia/Kolkata
RUN yarn global add sqlite3
RUN yarn install --no-audit

CMD ["node", "bot.js"]
