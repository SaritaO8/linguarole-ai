const body = await request.json();

const reply = await generateResponse(
  body.message,
  body.language,
  body.scenario,
  body.level,
  body.history
);

return Response.json({
  reply,
});